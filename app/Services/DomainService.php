<?php

namespace App\Services;

use App\Models\Domain;
use App\Models\Folder;

class DomainService
{
    public function normalizeDomain(string $url): string
    {
        $url = preg_replace('#^https?://#', '', $url);

        $url = preg_replace('#^www\.#', '', $url);

        $parts = parse_url('http://' . $url);

        return strtolower($parts['host'] ?? $url);
    }

    public function processDomains(Folder $folder, string $input): array
    {
        $input = str_replace(["\r\n", "\r", "\n"], ',', $input);

        $domains = array_filter(
            array_map('trim', explode(',', $input)),
            fn($domain) => !empty($domain)
        );

        $added = [];
        $duplicates = [];

        foreach ($domains as $domain) {
            $normalized = $this->normalizeDomain($domain);

            $existingDomain = Domain::where('folder_id', $folder->id)
                ->where('normalized_domain', $normalized)
                ->first();

            if (!$existingDomain) {
                Domain::create([
                    'folder_id' => $folder->id,
                    'original_url' => $domain,
                    'normalized_domain' => $normalized
                ]);

                $added[] = $domain;
            } else {
                $duplicates[] = [
                    'attempted' => $domain,
                    'existing' => $existingDomain->original_url,
                    'normalized' => $normalized
                ];
            }
        }

        return [
            'added' => $added,
            'duplicates' => $duplicates
        ];
    }
}
