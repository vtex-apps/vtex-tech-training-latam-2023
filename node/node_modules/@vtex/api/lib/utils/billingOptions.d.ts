import { BillingOptions, CalculationItem, FixedCalculationItem, FreeBillingOptions, LegacyFreeBillingOptions } from '../responses';
export declare const isFreeBillingOptions: (billingOptions: BillingOptions) => billingOptions is FreeBillingOptions | LegacyFreeBillingOptions;
export declare const isFixedCalculationItem: (item: CalculationItem) => item is FixedCalculationItem;
