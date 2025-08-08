<?php

namespace App\Http\Controllers;

use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FolderController extends Controller
{
    public function index()
    {
        return Inertia::render('Folders/Index', [
            'folders' => Folder::withCount('domains')->where('user_id', auth()->id())->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:folders'
        ]);

        $validated['user_id'] = auth()->id();

        $folder = Folder::create($validated);

        return redirect()->route('folders.show', $folder);
    }

    public function show(Folder $folder)
    {
        // No need for guard in that simple app
        if ($folder->user_id !== auth()->id()) {
            abort(404);
        }

        return Inertia::render('Folders/Show', [
            'folder' => $folder->load('domains')
        ]);
    }
}
