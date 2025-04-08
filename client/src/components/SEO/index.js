import SeoHead from "./SeoHead";
import {
  COMPANY_INFO,
  PAGE_SEO,
  KEYWORD_GROUPS,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getServiceSchema,
  getLegalPageSchema,
} from "./seoConfig";
import BacklinkHelper from "./BacklinkHelper";
import LinkBuildingStrategy from "./LinkBuildingStrategy";

// Schema generators
import { getServiceSchema as getServiceSchemaGenerator } from "./schemaGenerators";

export {
  SeoHead,
  COMPANY_INFO,
  PAGE_SEO,
  KEYWORD_GROUPS,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getServiceSchemaGenerator,
  getLegalPageSchema,
  BacklinkHelper,
  LinkBuildingStrategy,
};
