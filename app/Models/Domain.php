<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    protected $fillable = ['folder_id', 'original_url', 'normalized_domain'];

    public function folder()
    {
        return $this->belongsTo(Folder::class);
    }
}
