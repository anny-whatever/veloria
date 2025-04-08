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

// Import schema generators
import {
  getServiceSchema as getServiceSchemaGenerator,
  getProjectSchema,
  getFaqSchema,
  getPersonSchema,
} from "./schemaGenerators";

export {
  SeoHead,
  COMPANY_INFO,
  PAGE_SEO,
  KEYWORD_GROUPS,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getServiceSchema,
  getServiceSchemaGenerator,
  getProjectSchema,
  getFaqSchema,
  getPersonSchema,
  getLegalPageSchema,
  BacklinkHelper,
  LinkBuildingStrategy,
};
