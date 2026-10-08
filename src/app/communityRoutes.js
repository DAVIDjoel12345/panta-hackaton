export const communityRoutes = [
  {
    "path": "/rooms/joined",
    "name": "Joined Rooms",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.JoinedRoomsPage",
    "component": "JoinedRoomsPage",
    "file": "src/pages/community/JoinedRoomsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/posts",
    "name": "Room Posts",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomPostsPage",
    "component": "RoomPostsPage",
    "file": "src/pages/community/RoomPostsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/posts/new",
    "name": "Create Post",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.CreatePostPage",
    "component": "CreatePostPage",
    "file": "src/pages/community/CreatePostPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/posts/:postId",
    "name": "Post Details",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P1",
    "id": "community.PostDetailsPage",
    "component": "PostDetailsPage",
    "file": "src/pages/community/PostDetailsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/posts/:postId/edit",
    "name": "Edit Post",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.EditPostPage",
    "component": "EditPostPage",
    "file": "src/pages/community/EditPostPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/my-posts",
    "name": "My Room Posts",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.MyRoomPostsPage",
    "component": "MyRoomPostsPage",
    "file": "src/pages/community/MyRoomPostsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/membership",
    "name": "Room Membership",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomMembershipPage",
    "component": "RoomMembershipPage",
    "file": "src/pages/community/RoomMembershipPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/settings",
    "name": "Room Manage Settings",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomManageSettingsPage",
    "component": "RoomManageSettingsPage",
    "file": "src/pages/community/RoomManageSettingsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/rules",
    "name": "Room Manage Rules",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomManageRulesPage",
    "component": "RoomManageRulesPage",
    "file": "src/pages/community/RoomManageRulesPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/members",
    "name": "Room Manage Members",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomManageMembersPage",
    "component": "RoomManageMembersPage",
    "file": "src/pages/community/RoomManageMembersPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/requests",
    "name": "Room Manage Requests",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomManageRequestsPage",
    "component": "RoomManageRequestsPage",
    "file": "src/pages/community/RoomManageRequestsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/moderators",
    "name": "Room Manage Moderators",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomManageModeratorsPage",
    "component": "RoomManageModeratorsPage",
    "file": "src/pages/community/RoomManageModeratorsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/pending-posts",
    "name": "Room Manage Pending Posts",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomManagePendingPostsPage",
    "component": "RoomManagePendingPostsPage",
    "file": "src/pages/community/RoomManagePendingPostsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/reports",
    "name": "Room Manage Reports",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomManageReportsPage",
    "component": "RoomManageReportsPage",
    "file": "src/pages/community/RoomManageReportsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/restrictions",
    "name": "Room Manage Restrictions",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomManageRestrictionsPage",
    "component": "RoomManageRestrictionsPage",
    "file": "src/pages/community/RoomManageRestrictionsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/bans",
    "name": "Room Manage Bans",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomManageBansPage",
    "component": "RoomManageBansPage",
    "file": "src/pages/community/RoomManageBansPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/activity",
    "name": "Room Manage Activity",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomManageActivityPage",
    "component": "RoomManageActivityPage",
    "file": "src/pages/community/RoomManageActivityPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage/reports/:reportId",
    "name": "Room Report Detail",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.RoomReportDetailPage",
    "component": "RoomReportDetailPage",
    "file": "src/pages/community/RoomReportDetailPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/saved/posts",
    "name": "Saved Community Posts",
    "feature": "saved",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P1",
    "id": "community.SavedCommunityPostsPage",
    "component": "SavedCommunityPostsPage",
    "file": "src/pages/saved/SavedCommunityPostsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  }
]
