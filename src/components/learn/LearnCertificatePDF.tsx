'use client';

import { useState } from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer';
import { CERTIFICATE_TITLE } from '@/lib/learn-config';
import { Download } from 'lucide-react';

const FOUNDER_NAME = 'Febri Nirwana';
const CO_FOUNDER_NAME = 'Revito Pradipa';

// A5 landscape: 210mm x 148mm in points (width x height)
const A5_LANDSCAPE: [number, number] = [595.28, 419.53];

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: '#0a1628',
    fontFamily: 'Helvetica',
    alignItems: 'center',
    justifyContent: 'center',
  },
  border: {
    margin: 24,
    padding: 28,
    borderWidth: 3,
    borderColor: '#84cc16',
    borderRadius: 8,
    flex: 1,
    maxWidth: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 10,
    color: '#94a3b8',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 4,
  },
  certificateTitle: {
    fontSize: 20,
    color: '#d6ed17',
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 9,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 1.4,
  },
  date: {
    fontSize: 9,
    color: '#64748b',
    marginBottom: 18,
  },
  signaturesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
    paddingHorizontal: 16,
  },
  signatureBlock: {
    alignItems: 'center',
    width: '45%',
  },
  signatureImage: {
    width: 88,
    height: 32,
    marginBottom: 4,
  },
  signatureName: {
    fontSize: 9,
    color: '#94a3b8',
    fontWeight: 'bold',
    marginBottom: 1,
  },
  signatureTitle: {
    fontSize: 7,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 7,
    color: '#475569',
  },
});

function CertificateDocument({
  name,
  completedAt,
  logoUrl,
  founderSignatureUrl,
  coFounderSignatureUrl,
}: {
  name: string;
  completedAt: string;
  logoUrl: string;
  founderSignatureUrl: string;
  coFounderSignatureUrl: string;
}) {
  const dateStr = new Date(completedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page size={A5_LANDSCAPE} style={styles.page}>
        <View style={styles.border}>
          {logoUrl ? (
            <Image src={logoUrl} style={styles.logo} />
          ) : (
            <View style={[styles.logo, { backgroundColor: '#84cc16', borderRadius: 8 }]} />
          )}
          <Text style={styles.title}>Certificate of Completion</Text>
          <Text style={styles.certificateTitle}>{CERTIFICATE_TITLE}</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.body}>
            has successfully completed all required modules in smart contract security
            fundamentals, including vulnerabilities, case studies, and best practices.
          </Text>
          <Text style={styles.date}>Completed on {dateStr}</Text>

          <View style={styles.signaturesRow}>
            <View style={styles.signatureBlock}>
              {founderSignatureUrl ? (
                <Image src={founderSignatureUrl} style={styles.signatureImage} />
              ) : (
                <View style={[styles.signatureImage, { backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#64748b' }]} />
              )}
              <Text style={styles.signatureName}>{FOUNDER_NAME}</Text>
              <Text style={styles.signatureTitle}>Founder</Text>
            </View>
            <View style={styles.signatureBlock}>
              {coFounderSignatureUrl ? (
                <Image src={coFounderSignatureUrl} style={styles.signatureImage} />
              ) : (
                <View style={[styles.signatureImage, { backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: '#64748b' }]} />
              )}
              <Text style={styles.signatureName}>{CO_FOUNDER_NAME}</Text>
              <Text style={styles.signatureTitle}>Co-Founder</Text>
            </View>
          </View>
        </View>
        <Text style={styles.footer}>Hexific · hexific.com · HexiLearn Security Learning Center</Text>
      </Page>
    </Document>
  );
}

export function LearnCertificatePDF({
  name,
  completedAt,
}: {
  name: string;
  completedAt: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      // PDF renderer does not support SVG; use PNG so the logo appears when opened/printed
      const logoUrl = origin ? `${origin}/logo.png` : '';
      const founderSignatureUrl = origin ? `${origin}/signatures/febri-sign.png` : '';
      const coFounderSignatureUrl = origin ? `${origin}/signatures/revito-sign.png` : '';
      const doc = (
        <CertificateDocument
          name={name}
          completedAt={completedAt}
          logoUrl={logoUrl}
          founderSignatureUrl={founderSignatureUrl}
          coFounderSignatureUrl={coFounderSignatureUrl}
        />
      );
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hexilearn-certificate-${name.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 px-4 py-2 bg-lime-400 text-black font-semibold rounded-lg hover:bg-lime-300 disabled:opacity-50 transition-colors"
    >
      {loading ? (
        <span className="animate-spin">⏳</span>
      ) : (
        <Download className="w-4 h-4" />
      )}
      Download PDF
    </button>
  );
}
