export interface Asset {
  id: string;
  name: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  owner: string;
}

export type AssetList = Asset[];

export interface Vulnerability {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface AssetDetails {
  id: string;
  name: string;
  vulnerabilities: Vulnerability[];
}
