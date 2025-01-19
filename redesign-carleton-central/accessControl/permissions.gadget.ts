import type { GadgetPermissions } from "gadget-server";

/**
 * This metadata describes the access control configuration available in your application.
 * Grants that are not defined here are set to false by default.
 *
 * View and edit your roles and permissions in the Gadget editor at https://redesign-carleton-central.gadget.app/edit/settings/permissions
 */
export const permissions: GadgetPermissions = {
  type: "gadget/permissions/v1",
  roles: {
    "signed-in": {
      storageKey: "signed-in",
      default: {
        read: true,
        action: true,
      },
      models: {
        courses: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        courseSection: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        courseToCourseSection: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        requiredCourses: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        schedule: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        user: {
          read: {
            filter: "accessControl/filters/user/tenant.gelly",
          },
          actions: {
            changePassword: {
              filter: "accessControl/filters/user/tenant.gelly",
            },
            signOut: {
              filter: "accessControl/filters/user/tenant.gelly",
            },
          },
        },
        worksheet: {
          read: true,
          actions: {
            create: true,
            delete: true,
            getByNameAndUser: true,
            update: true,
          },
        },
      },
      actions: {
        seedCourses: true,
        seedCourseSection: true,
        seedCourseToCourseSection: true,
        seedRequiredCourses: true,
      },
    },
    unauthenticated: {
      storageKey: "unauthenticated",
      models: {
        user: {
          actions: {
            resetPassword: true,
            sendResetPassword: true,
            sendVerifyEmail: true,
            signIn: true,
            signUp: true,
            verifyEmail: true,
          },
        },
      },
    },
  },
};
