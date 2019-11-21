// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  services: {
    gatewayUrl: "https://creditq.in/api/api/v1/",
    files: {
      baseUrl: "https://admin.creditq.in/",
      postImage: "upload_images",
      removeDefaulterDoc: "upload_images/remove_defaulter_doc",
      profileImage: "data/profile_images/",
      viewDocument: "data/defaulter_documents/"
    },
    authorization: {
      baseUrl: "auth",
      api: {
        postLogin: "/login"
      }
    },

    dashboard: {
      baseUrl: "dashboard",
      api: {
        getDashboard: "/:id"
      }
    },

    user: {
      baseUrl: "user",
      api: {
        postByGSTNo: "/gstno",
        getCheckDefaulter: "/checkdefaulter/:id",
        getCheckCustomerNewDefaulter: "/checkcustomernewdefaulter",
        putProfilePic: "/updateimage",
        putChangePassword: "/changepassword",
        postSendOTP: "/sendotp",
        postVerifyOTP: "/verifyotp",
        putResetPassword: "/resetpassword",
        putUpdate: "/update",
        postReferralCode: "/referralcode",
        getExecutiveCode: "/executivecode/:code",
        createVisitor: "/visitors"
      }
    },

    userBank: {
      baseUrl: "user/bank",
      api: {
        postList: "/list",
        getById: "/:id",
        postSave: "",
        putUpdate: "",
        getByIFSC: "/ifsc/:ifsc_code"
      }
    },

    defaulter: {
      baseUrl: "defaulter",
      api: {
        postRequestList: "/requestlist",
        postSave: "/create",
        putSettlement: "/settlement",
        deleteRequest: "/:id",
        getById: "/:id"
      }
    },

    payment: {
      baseUrl: "payments",
      api: {
        postList: "/list",
        postSave: "/create",
        putUpdate: "/update",
        getById: "/:id"
      }
    },

    paytm: {
      baseUrl: "paytm",
      api: {
        postChecksum: "/checksum",
        postVerifyChecksum: "/verifychecksum"
      }
    },

    promoCode: {
      baseUrl: "promocode",
      api: {
        postApplyPromo: "/applypromo"
      }
    },

    cqe: {
      baseUrl: "cqe",
      api: {
        postRequestList: "/requestlist",
        postSave: "/create"
      }
    },

    faqs: {
      baseUrl: "faqs",
      api: {
        postList: "/list"
      }
    },

    subscribe: {
      baseUrl: "subscribe",
      api: {
        postSave: "/create"
      }
    },

    contact: {
      baseUrl: "contact",
      api: {
        postSave: "/create"
      }
    },

    content: {
      baseUrl: "content",
      api: {
        getBySlug: "/:slug"
      }
    },

    master: {
      baseUrl: "master",
      api: {
        getCategory: "/category",
        getSetting: "/setting"
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
