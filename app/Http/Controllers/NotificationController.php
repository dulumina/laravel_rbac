<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function __construct(private NotificationService $notificationService) {}

    public function markAsRead(Request $request, string $id)
    {
        $this->notificationService->markAsRead($request->user(), $id);

        return back();
    }

    public function markAllAsRead(Request $request)
    {
        $this->notificationService->markAllAsRead($request->user());

        return back();
    }

    public function destroy(Request $request, string $id)
    {
        $this->notificationService->delete($request->user(), $id);

        return back();
    }
}
