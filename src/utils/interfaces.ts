export type Role = {
    id: number;
    name: string;
    description: string;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
};

export type Section = {
    id: string;
    label: string;
    component: React.FC;
}

export type TechCount = {
    id: number;
    tech: string;
    amount: number;
    role: string;
}

export type CategoryCount = {
    categoryName: string;
    techCountArray: TechCount[];
}

export type RoleCounts = {
    roleName: string;
    categoriesCounts: CategoryCount[];
}

export type RoleListingCount = {
    id: number;
    counter: number;
    role_id: number;
}
export type CategoryData = {
    [category: string]: TechCount[];
  }

export type FormattedDataRow = {
    id: number;
    tech: string;
    amount: number;
    role: string;
}