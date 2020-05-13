import { AppGraphQLClient } from '..';
import { InstanceOptions, IOContext } from '../../..';
import { RequestTracingConfig } from '../../../HttpClient';
import { Brand } from './brand';
import { Category } from './category';
import { Product } from './product';
import { SKU } from './sku';
export declare class CatalogGraphQL extends AppGraphQLClient {
    constructor(ctx: IOContext, opts?: InstanceOptions);
    sku: (id: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<{
        sku: SKU;
    } | undefined>;
    product: (id: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<{
        product: Product;
    } | undefined>;
    category: (id: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<{
        category: Category;
    } | undefined>;
    brand: (id: string, tracingConfig?: RequestTracingConfig | undefined) => Promise<{
        brand: Brand;
    } | undefined>;
}
