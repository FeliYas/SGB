<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function index()
    {
        $subscribers = Newsletter::all();
        return inertia('admin/newsletterAdmin', ['subscribers' => $subscribers]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletters,email',
        ]);

        Newsletter::create(['email' => $request->email]);

        return response()->json(['success' => 'Gracias por suscribirte a nuestro boletín.']);
    }
    public function destroy($id)
    {
        $suscriber = Newsletter::findOrFail($id);
        $suscriber->delete();
    }

}
