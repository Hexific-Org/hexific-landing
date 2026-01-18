import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { contractsAudited, vulnerabilitiesFound } = body;

    // Validate input
    if (typeof contractsAudited !== 'number' && typeof vulnerabilitiesFound !== 'number') {
      return NextResponse.json(
        { error: 'At least one of contractsAudited or vulnerabilitiesFound must be provided' },
        { status: 400 }
      );
    }

    // Increment contracts_audited
    if (typeof contractsAudited === 'number' && contractsAudited > 0) {
      const { error } = await supabase.rpc('increment_stat', {
        p_stat_key: 'contracts_audited',
        p_amount: contractsAudited
      });
      if (error) {
        console.error('Error incrementing contracts_audited:', error);
      }
    }

    // Increment vulnerabilities_found
    if (typeof vulnerabilitiesFound === 'number' && vulnerabilitiesFound > 0) {
      const { error } = await supabase.rpc('increment_stat', {
        p_stat_key: 'vulnerabilities_found',
        p_amount: vulnerabilitiesFound
      });
      if (error) {
        console.error('Error incrementing vulnerabilities_found:', error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in stats update:', error);
    // Return success anyway - we don't want to break the audit flow
    return NextResponse.json({ success: true });
  }
}
