export enum OperationEnum {
    View,
    Add,
    Modify,
    Delete
}

export enum DateFormatEnum {
    DDMMYYYY = 'DD/MM/YYYY',
    MMDDYYYY = 'MM/DD/YYYY',
    YYYYMMDD = 'YYYY/MM/DD',
    YYYY_MM_DD = 'YYYY-MM-DD',
    DDMMMYYYY = 'DD MMM YYYY',
}

export enum StatusEnum {
    Pending = 'pending',
    Verified = 'verified',
    Rejected = 'rejected',
    Processing = 'processing',
    RequestMoreDetails = 'more_details_required',
    DocumentResubmitted = 'document_resubmitted',
    Other = 'other'
}

export enum AlertType {
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
    primary = 'primary',
    secondary = 'secondary',
    dark = 'dark',
    light = 'light'
}

export enum PopupType {
    ForgotPassword = 'ForgotPassword',
    Login = 'Login',
    SigUp = 'SigUp'
}

export enum BoolStatus {
    yes = 'yes',
    no = 'no'
}

export enum PaymentType {
    membership = 'membership',
    creditScore = 'credit_score'
}

export enum SettlementType {
    Full = 'Full',
    Partial = 'Partial'
}

export enum PaymentStatus {
    pending = 'pending',
    initialize = 'initialize',
    failure = 'failure',
    success = 'success'
}

export enum CQERequestStatus {
    "pending" = "pending",
    "processing" = "processing",
    "requested" = "requested",
    "sent" = "sent",
    "payment_failed" = "payment_failed"
}

export enum QueryType {
    contact = 'contact',
    issue = 'issue'
}


export enum UserStatus {
    "active" = "active",
    "blocked" = "blocked",
    "deleted" = "deleted",
    "inactive" = "inactive",
    "bank_pending" = "bank_pending",
    "payment_pending" = "payment_pending",
    "mobile_verify_pending" = "mobile_verify_pending"
}

export enum PageSlug {
    privacyPolicy = 'privacy-policy',
    aboutUs = 'about-us',
    termsConditions = 'terms-and-conditions',
    refundPolicy = 'refund-policy'
}