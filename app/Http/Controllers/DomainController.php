<?php

namespace App\Http\Controllers;
use App\Models\Folder;
use App\Services\DomainService;
use Illuminate\Http\Request;

class DomainController extends Controller
{
    private DomainService $domainService;

    public function __construct(DomainService $domainService)
    {
        $this->domainService = $domainService;
    }

    public function store(Request $request, Folder $folder)
    {
        $validated = $request->validate([
            'domains' => 'required|string'
        ]);

        $result = $this->domainService->processDomains(
            $folder,
            $validated['domains']
        );

        return redirect()->back()->with([
            'message' => '...',
            'type' => 'success',
            'addedDomains' => $result['added'],
            'duplicates' => $result['duplicates']
        ]);
    }
}
