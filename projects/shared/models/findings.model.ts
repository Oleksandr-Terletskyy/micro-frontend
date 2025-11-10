export interface Finding {
  id: string;
  assetId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
}
