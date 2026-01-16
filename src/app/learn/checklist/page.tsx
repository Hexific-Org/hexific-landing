'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/learn/LearnComponents';
import '../styles.css';
import {
  ClipboardList,
  Lock,
  RefreshCw,
  CheckCircle,
  Link2,
  Coins,
  Calculator,
  Fuel,
  ArrowUpCircle,
  FileText,
  Download,
  PartyPopper
} from 'lucide-react';

// Checklist items organized by category
const checklistData = [
  {
    category: 'Access Control',
    icon: <Lock className="w-6 h-6" />,
    items: [
      { id: 'ac-1', text: 'All admin functions have proper access modifiers', critical: true },
      { id: 'ac-2', text: 'onlyOwner functions are reviewed for centralization risks', critical: true },
      { id: 'ac-3', text: 'Role-based access control is implemented where needed', critical: false },
      { id: 'ac-4', text: 'Two-step ownership transfer is used (if applicable)', critical: false },
      { id: 'ac-5', text: 'Initializers can only be called once', critical: true },
    ]
  },
  {
    category: 'Reentrancy Protection',
    icon: <RefreshCw className="w-6 h-6" />,
    items: [
      { id: 're-1', text: 'All external calls follow Checks-Effects-Interactions pattern', critical: true },
      { id: 're-2', text: 'ReentrancyGuard is used on sensitive functions', critical: true },
      { id: 're-3', text: 'Cross-function reentrancy is considered', critical: true },
      { id: 're-4', text: 'Read-only reentrancy vectors are evaluated', critical: false },
    ]
  },
  {
    category: 'Input Validation',
    icon: <CheckCircle className="w-6 h-6" />,
    items: [
      { id: 'iv-1', text: 'All external inputs are validated', critical: true },
      { id: 'iv-2', text: 'Array length limits are enforced', critical: false },
      { id: 'iv-3', text: 'Zero address checks are in place', critical: true },
      { id: 'iv-4', text: 'Numeric bounds are validated', critical: true },
      { id: 'iv-5', text: 'Signature replay protection is implemented', critical: true },
    ]
  },
  {
    category: 'External Interactions',
    icon: <Link2 className="w-6 h-6" />,
    items: [
      { id: 'ei-1', text: 'Return values from external calls are checked', critical: true },
      { id: 'ei-2', text: 'Low-level calls have proper error handling', critical: true },
      { id: 'ei-3', text: 'Untrusted external contracts are handled safely', critical: true },
      { id: 'ei-4', text: 'Oracle data has staleness checks', critical: true },
      { id: 'ei-5', text: 'TWAP or multiple oracle sources are used', critical: false },
    ]
  },
  {
    category: 'Token Handling',
    icon: <Coins className="w-6 h-6" />,
    items: [
      { id: 'th-1', text: 'ERC20 transfer/approve return values are handled', critical: true },
      { id: 'th-2', text: 'Fee-on-transfer tokens are considered', critical: false },
      { id: 'th-3', text: 'Rebasing tokens are handled correctly', critical: false },
      { id: 'th-4', text: 'ERC777 callback reentrancy is prevented', critical: true },
      { id: 'th-5', text: 'Token decimals are handled correctly', critical: true },
    ]
  },
  {
    category: 'Arithmetic & Logic',
    icon: <Calculator className="w-6 h-6" />,
    items: [
      { id: 'al-1', text: 'Division by zero is prevented', critical: true },
      { id: 'al-2', text: 'Rounding errors are minimized and documented', critical: false },
      { id: 'al-3', text: 'unchecked blocks are reviewed carefully', critical: true },
      { id: 'al-4', text: 'Type casting is done safely', critical: true },
      { id: 'al-5', text: 'Order of operations is correct', critical: true },
    ]
  },
  {
    category: 'Gas & DoS Prevention',
    icon: <Fuel className="w-6 h-6" />,
    items: [
      { id: 'gas-1', text: 'Loops have bounded iterations', critical: true },
      { id: 'gas-2', text: 'External calls in loops are minimized', critical: true },
      { id: 'gas-3', text: 'Pull over push pattern is used for ETH transfers', critical: false },
      { id: 'gas-4', text: 'Storage operations are optimized', critical: false },
      { id: 'gas-5', text: 'Callback gas limits are considered', critical: false },
    ]
  },
  {
    category: 'Upgradability (if applicable)',
    icon: <ArrowUpCircle className="w-6 h-6" />,
    items: [
      { id: 'up-1', text: 'Storage layout is compatible between versions', critical: true },
      { id: 'up-2', text: 'Implementation contracts are initialized', critical: true },
      { id: 'up-3', text: 'Proxy admin is properly secured', critical: true },
      { id: 'up-4', text: 'UUPS _authorizeUpgrade is protected', critical: true },
      { id: 'up-5', text: 'Storage gaps are reserved for future use', critical: false },
    ]
  },
  {
    category: 'Testing & Documentation',
    icon: <FileText className="w-6 h-6" />,
    items: [
      { id: 'td-1', text: 'Unit tests cover all functions', critical: true },
      { id: 'td-2', text: 'Integration tests are written', critical: true },
      { id: 'td-3', text: 'Fuzz tests are implemented', critical: false },
      { id: 'td-4', text: 'NatSpec documentation is complete', critical: false },
      { id: 'td-5', text: 'README includes deployment instructions', critical: false },
      { id: 'td-6', text: 'Known limitations are documented', critical: false },
    ]
  },
];

export default function ChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showOnlyCritical, setShowOnlyCritical] = useState(false);

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const totalItems = checklistData.reduce((acc, cat) => acc + cat.items.length, 0);
  const criticalItems = checklistData.reduce(
    (acc, cat) => acc + cat.items.filter(i => i.critical).length,
    0
  );
  const checkedCount = checkedItems.size;
  const checkedCritical = checklistData.reduce(
    (acc, cat) => acc + cat.items.filter(i => i.critical && checkedItems.has(i.id)).length,
    0
  );

  const progress = Math.round((checkedCount / totalItems) * 100);
  const criticalProgress = Math.round((checkedCritical / criticalItems) * 100);

  const resetChecklist = () => setCheckedItems(new Set());

  return (
    <div>
      <Breadcrumb items={[
        { label: 'HexiLearn', href: '/learn' },
        { label: 'Security Checklist' },
      ]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-lime-400" />
          Pre-Audit Security Checklist
        </h1>
        <p className="text-gray-400 text-lg max-w-3xl">
          Use this comprehensive checklist to ensure your smart contracts are ready for audit.
          Critical items are marked with a red indicator.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-lime-400/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Your Progress</h3>
            <p className="text-sm text-gray-400">
              {checkedCount} of {totalItems} items completed
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowOnlyCritical(!showOnlyCritical)}
              className={`px-4 py-2 text-sm rounded-lg border transition-all ${showOnlyCritical
                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                : 'bg-white/5 border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
            >
              {showOnlyCritical ? 'Critical Only' : 'Show All'}
            </button>
            <button
              onClick={resetChecklist}
              className="px-4 py-2 text-sm rounded-lg border border-gray-700 text-gray-400 hover:border-gray-500 transition-all"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Progress bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-lime-400">{progress}%</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-lime-400 to-green-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Critical Items</span>
              <span className="text-red-400">{checkedCritical}/{criticalItems}</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${criticalProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-6">
        {checklistData.map((category) => {
          const filteredItems = showOnlyCritical
            ? category.items.filter(i => i.critical)
            : category.items;

          if (filteredItems.length === 0) return null;

          const categoryChecked = category.items.filter(i => checkedItems.has(i.id)).length;
          const categoryTotal = category.items.length;

          return (
            <div key={category.category} className="rounded-2xl bg-white/[0.02] border border-lime-400/10 overflow-hidden">
              {/* Category Header */}
              <div className="p-4 bg-lime-400/5 border-b border-lime-400/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-lime-400">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{category.category}</h3>
                </div>
                <span className="text-sm text-gray-400">
                  {categoryChecked}/{categoryTotal} completed
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-800">
                {filteredItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-4 p-4 hover:bg-white/[0.02] cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.has(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className="w-5 h-5 rounded border-2 border-gray-600 bg-transparent checked:bg-lime-400 checked:border-lime-400 focus:ring-lime-400 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className={`flex-1 ${checkedItems.has(item.id) ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                      {item.text}
                    </span>
                    {item.critical && (
                      <span className="px-2 py-0.5 text-xs font-medium rounded bg-red-500/20 text-red-400 border border-red-500/30">
                        Critical
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Message */}
      {progress === 100 && (
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-lime-400/20 to-green-500/20 border border-lime-400/40 text-center">
          <div className="w-16 h-16 rounded-2xl bg-lime-400/20 flex items-center justify-center text-lime-400 mx-auto mb-4">
            <PartyPopper className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-lime-400 mb-2">Checklist Complete!</h3>
          <p className="text-gray-300 mb-4">
            Great job! Your contracts appear to follow security best practices.
            Consider getting a professional audit for additional assurance.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-lime-400 text-black font-semibold rounded-xl hover:bg-lime-300 transition-colors"
          >
            Get a Professional Audit
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      )}

      {/* Download/Export */}
      <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-lime-400/10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-lime-400" />
          Export Checklist
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          Download this checklist as a markdown file to include in your project documentation.
        </p>
        <button className="px-4 py-2 bg-lime-400/10 border border-lime-400/30 text-lime-400 rounded-lg hover:bg-lime-400/20 transition-colors">
          Download as Markdown
        </button>
      </div>
    </div>
  );
}
