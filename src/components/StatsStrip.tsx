const stats = [
  { value: '22', label: 'Postgres tables designed', source: 'Supstaff' },
  { value: '4 / 5', label: 'Phases shipped', source: 'Supstaff' },
  { value: '441', label: 'Automated tests in CI', source: 'Swole' },
  { value: '98', label: 'Endpoints security-audited', source: 'Swole' },
];

export function StatsStrip() {
  return (
    <section aria-label="Numbers from my projects" className="px-6 pb-20 md:pb-28">
      <dl className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm">
        {stats.map(({ value, label, source }, i) => (
          <div
            key={label}
            className={`flex flex-col-reverse justify-end px-5 py-6 border-neutral-800 ${
              i % 2 === 1 ? 'border-l' : ''
            } ${i >= 2 ? 'border-t md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
          >
            <dt className="mt-2 text-sm font-mono text-neutral-400 leading-snug">
              {label}
              <span className="block text-neutral-600">{source}</span>
            </dt>
            <dd className="text-3xl md:text-4xl font-bold font-display text-white">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
