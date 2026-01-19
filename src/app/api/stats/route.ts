import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    // Fetch stats from the 'platform_stats' table
    const { data, error } = await supabase
      .from('platform_stats')
      .select('stat_key, stat_value')
      .in('stat_key', ['vulnerabilities_found', 'contracts_audited']);

    if (error) {
      console.error('Supabase error:', error);
      // Return fallback values if there's an error
      return NextResponse.json({
        vulnerabilitiesFound: 700,
        contractsAudited: 50,
      });
    }

    // Parse the stats into a response object
    const stats: Record<string, number> = {};
    for (const row of data || []) {
      stats[row.stat_key] = row.stat_value;
    }

    return NextResponse.json({
      vulnerabilitiesFound: stats.vulnerabilities_found ?? 700,
      contractsAudited: stats.contracts_audited ?? 50,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    // Return fallback values on error
    return NextResponse.json({
      vulnerabilitiesFound: 700,
      contractsAudited: 50,
    });
  }
}
