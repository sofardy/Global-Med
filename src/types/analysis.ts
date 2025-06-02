export interface AnalysisItem {
  uuid: string;
  slug: string;
  name: string;
  mini_description: string;
  description: string;
  symptoms_title: string;
  symptoms_list: string[];
  medical_tests_list: Array<{
    name: string;
    value: string;
  }>;
  icon: string | null;
}

export interface AnalysisResponse {
  data: AnalysisItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface AnalysisDetailResponse {
  data: AnalysisItem;
}
