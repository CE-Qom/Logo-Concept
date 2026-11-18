import React, {useMemo, useState} from 'react';
import {Download, Maximize2} from 'lucide-react';
import {ConceptLightboxModal} from './components/ConceptLightboxModal';
import {UniversityMatcher} from './components/UniversityMatcher';
import {LOGO_CONCEPTS} from './data/concepts';
import {ConceptCategory, LockupMode, LogoConcept} from './types/logo';

const QOM_EMBLEM_SRC = '/assets/aistudio/image_489f4e8f.png';

export default function App() {
  const [selectedId, setSelectedId] = useState<string>(LOGO_CONCEPTS[0].id);
  const [filterCategory, setFilterCategory] = useState<ConceptCategory>('s4_colored');
  const [lockup, setLockup] = useState<LockupMode>('mark');
  const [showOriginalInHero, setShowOriginalInHero] = useState<boolean>(true);
  const [associationName, setAssociationName] = useState<string>(
    'انجمن علمی مهندسی کامپیوتر',
  );
  const [universityName, setUniversityName] = useState<string>('دانشگاه قم');
  const [lightboxConcept, setLightboxConcept] = useState<LogoConcept | null>(
    null,
  );

  const selectedConcept = useMemo(
    () => LOGO_CONCEPTS.find((c) => c.id === selectedId) ?? LOGO_CONCEPTS[0],
    [selectedId],
  );

  const filteredConcepts = useMemo(() => {
    if (filterCategory === 'all') return LOGO_CONCEPTS;
    return LOGO_CONCEPTS.filter((c) => c.series === filterCategory);
  }, [filterCategory]);

  const handleDownloadSelectedImage = (concept: LogoConcept = selectedConcept) => {
    const link = document.createElement('a');
    link.href = concept.imagePath;
    link.download = `qom-ce-concept-${concept.index}-${concept.id}.jpg`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-950">
      {/* Top Bar Contract: strictly 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4">
          <a
            href="#top"
            className="text-base font-bold tracking-tight text-zinc-950 whitespace-nowrap shrink-0"
          >
            استودیو کانسپت لوگو
          </a>

          <nav
            aria-label="پیمایش بخش‌ها"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600"
          >
            <a
              href="#concepts"
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              ۱۰ کانسپت رنگی (سری ۸)
            </a>
            <a
              href="#university-match"
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              تطبیق با دانشگاه
            </a>
            <a
              href="#matrix"
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              جدول مقایسه
            </a>
            <a
              href="#export"
              className="hover:text-zinc-950 transition-colors whitespace-nowrap shrink-0"
            >
              دانلود تصاویر
            </a>
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => handleDownloadSelectedImage(selectedConcept)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#1E40AF] whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5" />
              <span>دانلود کانسپت انتخابی</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Hero Split */}
        <section className="mx-auto max-w-[1200px] px-6 pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-500">
                  انجمن علمی مهندسی کامپیوتر دانشگاه قم · سری هشتم: ۱۰ کانسپت رنگی از طرح منتخب سری ۴ (چرخ‌دنده دوبل + شبکه عصبی)
                </p>
                <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-zinc-950 md:text-4xl [text-wrap:balance]">
                  نسخه‌های رنگی طرح منتخب (چرخ‌دنده دوبل + شبکه عصبی کوچک)
                </h1>
                <p className="mt-4 text-sm leading-7 text-zinc-600">
                  دقیقاً بر اساس هندسه محبوب <strong>طرح شماره ۱۰ سری پیشین</strong> (تک‌رنگ مشکی چرخ‌دنده دوبل با شبکه عصبی کوچک داخل چیپ)، ۱۰ ترکیب رنگی حرفه‌ای شامل <strong>طلایی و مشکی</strong>، <strong>سرمه‌ای و طلایی</strong>، <strong>آبی کبالت</strong> و <strong>سبز PCB</strong> تولید شده است.
                </p>

                <div className="mt-5 flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-white p-1.5">
                    <img
                      src={QOM_EMBLEM_SRC}
                      alt="لوگوی اصلی دانشگاه قم"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="text-xs leading-6 text-zinc-700">
                    <p className="font-semibold text-zinc-900">
                      مبنای طراحی: نشان دانشگاه قم (مجموعاً ۸۰ کانسپت)
                    </p>
                    <p className="mt-0.5 text-zinc-600">
                      ۱۰ کانسپت رنگی جدید (۰۱ تا ۱۰) مستقیماً از روی طرح منتخب چرخ‌دنده دوبل ساخته شده‌اند و ۷ سری قبلی در تب‌ها قابل مقایسه‌اند.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 rounded-xl border border-zinc-200 bg-white p-5">
                <div className="text-xs font-semibold text-zinc-900">
                  تنظیم عنوان رسمی در پیش‌نمایش کنار لوگو
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="assoc-name-input"
                      className="block text-[11px] font-medium text-zinc-500"
                    >
                      عنوان انجمن
                    </label>
                    <input
                      id="assoc-name-input"
                      type="text"
                      value={associationName}
                      onChange={(e) => setAssociationName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-200 bg-[#FAFAFA] px-3 py-2 text-xs text-zinc-900 focus:border-[#1D4ED8] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="uni-name-input"
                      className="block text-[11px] font-medium text-zinc-500"
                    >
                      نام دانشگاه
                    </label>
                    <input
                      id="uni-name-input"
                      type="text"
                      value={universityName}
                      onChange={(e) => setUniversityName(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-zinc-200 bg-[#FAFAFA] px-3 py-2 text-xs text-zinc-900 focus:border-[#1D4ED8] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-spec font-semibold text-zinc-400">
                    {selectedConcept.index}
                  </span>
                  <span className="font-bold text-zinc-950">
                    {selectedConcept.title}
                  </span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-500">{selectedConcept.paletteNote}</span>
                </div>

                <div className="flex items-center gap-1 rounded-lg bg-zinc-100 p-1">
                  {(
                    [
                      ['mark', 'فقط تصویر'],
                      ['horizontal', 'با عنوان افقی'],
                      ['stacked', 'با عنوان عمودی'],
                    ] as [LockupMode, string][]
                  ).map(([mode, label]) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setLockup(mode)}
                      className={`rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        lockup === mode
                          ? 'bg-white text-zinc-950 shadow-xs'
                          : 'text-zinc-600 hover:text-zinc-950'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="my-5 flex min-h-[340px] flex-1 items-center justify-center rounded-xl border border-zinc-200/70 bg-white p-6">
                <div
                  className={`flex items-center justify-center gap-6 ${
                    lockup === 'stacked' ? 'flex-col text-center' : 'flex-row text-right'
                  }`}
                >
                  {showOriginalInHero && (
                    <div className="hidden sm:flex flex-col items-center gap-2 rounded-xl border border-zinc-100 bg-[#FAFAFA] p-3">
                      <img
                        src={QOM_EMBLEM_SRC}
                        alt="لوگوی اصلی دانشگاه قم"
                        referrerPolicy="no-referrer"
                        className="h-24 w-24 object-contain"
                      />
                      <span className="text-[10px] font-medium text-zinc-500">
                        لوگوی اصلی دانشگاه
                      </span>
                    </div>
                  )}

                  <img
                    src={selectedConcept.imagePath}
                    alt={selectedConcept.title}
                    referrerPolicy="no-referrer"
                    className={`object-contain transition-transform ${
                      lockup === 'mark'
                        ? 'h-72 w-72 sm:h-80 sm:w-80'
                        : 'h-44 w-44 sm:h-52 sm:w-52'
                    }`}
                  />

                  {lockup !== 'mark' && (
                    <div className="max-w-xs">
                      <div className="text-xl font-extrabold tracking-tight text-zinc-950">
                        {associationName}
                      </div>
                      <div className="mt-1 text-xs font-medium text-zinc-600">
                        {universityName}
                      </div>
                      <div className="mt-2 font-latin text-[11px] font-semibold tracking-wide text-zinc-400">
                        Computer Engineering Scientific Association
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-4">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-zinc-700">
                  <input
                    type="checkbox"
                    checked={showOriginalInHero}
                    onChange={(e) => setShowOriginalInHero(e.target.checked)}
                    className="h-4 w-4 accent-[#1D4ED8]"
                  />
                  <span>نمایش مقایسه کنار لوگوی اصلی دانشگاه قم</span>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadSelectedImage(selectedConcept)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-50 whitespace-nowrap shrink-0"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>دانلود تصویر</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxConcept(selectedConcept)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800 whitespace-nowrap shrink-0"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>بزرگ‌نمایی و آزمایش مقیاس</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Gallery with 4 Series Tabs */}
        <section id="concepts" className="mx-auto max-w-[1200px] px-6 py-10 md:py-14">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-500">
                گالری تصاویر نانو بنانا · انجمن علمی مهندسی کامپیوتر دانشگاه قم
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
                {filterCategory === 's4_colored'
                  ? 'سری هشتم: ۱۰ کانسپت رنگی از طرح منتخب سری ۴ + شبکه عصبی'
                  : filterCategory === 's4_neural'
                    ? 'سری هفتم: ۱۰ کانسپت ادامه سری ۴ (با شبکه عصبی کوچک درون چیپ)'
                    : filterCategory === 'neural_2wing'
                      ? 'سری ششم: ۱۰ کانسپت خالص ۲ یال + شبکه عصبی + چرخ‌دنده'
                      : filterCategory === 'balanced'
                        ? 'سری پنجم: ۱۰ کانسپت متعادل با جزئیات هدفمند'
                        : filterCategory === 'clean_gear'
                          ? 'سری چهارم: ۱۰ کانسپت پایه ساده + چرخ‌دنده'
                          : filterCategory === 'ai_mcu'
                            ? 'سری سوم: ۱۰ کانسپت میکروکنترلر و AI'
                            : filterCategory === 'cpu'
                              ? 'سری دوم: ۱۰ کانسپت پردازنده (CPU)'
                              : filterCategory === 'series1'
                                ? 'سری اول: ۱۰ کانسپت متنوع'
                                : 'همه ۸۰ کانسپت تولیدشده'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-1 rounded-lg bg-zinc-100 p-1 self-start">
              {(
                [
                  ['s4_colored', '۱۰ کانسپت رنگی جدید'],
                  ['s4_neural', 'سری ۷: ادامه سری ۴ (۱۰)'],
                  ['neural_2wing', 'سری ۶: ۲ یال + AI (۱۰)'],
                  ['balanced', 'سری ۵: متعادل (۱۰)'],
                  ['clean_gear', 'سری ۴ پایه (۱۰)'],
                  ['ai_mcu', 'سری AI (۱۰)'],
                  ['cpu', 'سری CPU (۱۰)'],
                  ['series1', 'سری اول (۱۰)'],
                  ['all', 'همه ۸۰ کانسپت'],
                ] as [ConceptCategory, string][]
              ).map(([cat, label]) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    filterCategory === cat
                      ? 'bg-white text-zinc-950 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredConcepts.map((concept) => {
              const isSelected = concept.id === selectedId;
              return (
                <article
                  key={concept.id}
                  onClick={() => setSelectedId(concept.id)}
                  className={`group flex cursor-pointer flex-col justify-between rounded-xl border bg-white p-5 transition-all duration-150 ${
                    isSelected
                      ? 'border-[#1D4ED8] ring-2 ring-[#1D4ED8]/15'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span className="font-spec">
                        {concept.index} · {concept.category}
                      </span>
                      {isSelected && (
                        <span className="font-semibold text-[#1D4ED8]">
                          انتخاب‌شده
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-zinc-100 bg-white p-3">
                      <img
                        src={concept.imagePath}
                        alt={concept.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="mt-4 flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-zinc-950">
                        {concept.title}
                      </h3>
                      <span className="text-[11px] text-zinc-400 whitespace-nowrap">
                        {concept.paletteNote}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-6 text-zinc-600">
                      {concept.summary}
                    </p>

                    <div className="mt-3 space-y-1.5 border-t border-zinc-100 pt-3 text-xs leading-5">
                      <p className="text-zinc-600">
                        <span className="font-semibold text-zinc-900">
                          ارتباط با قم:{' '}
                        </span>
                        {concept.universityLink}
                      </p>
                      <p className="text-zinc-600">
                        <span className="font-semibold text-zinc-900">
                          المان مهندسی:{' '}
                        </span>
                        {concept.engineeringLink}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-zinc-100 pt-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxConcept(concept);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-200 whitespace-nowrap shrink-0"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>بزرگ‌نمایی</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadSelectedImage(concept);
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 whitespace-nowrap shrink-0"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>دانلود عکس</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 2: University Logo Matcher */}
        <UniversityMatcher
          selectedConcept={selectedConcept}
          associationName={associationName}
          universityName={universityName}
        />

        {/* Section 3: Comparison Table */}
        <section id="matrix" className="mx-auto max-w-[1200px] px-6 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-zinc-500">
              جمع‌بندی و راهنمای انتخاب از بین {filteredConcepts.length} کانسپت نمایش‌داده‌شده
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl">
              مقایسه کاربردی کانسپت‌ها
            </h2>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white">
            <table className="w-full min-w-[760px] text-right text-xs">
              <thead>
                <tr className="border-b border-zinc-200 bg-[#FAFAFA] text-zinc-500">
                  <th className="px-5 py-3.5 font-semibold">کد و عنوان کانسپت</th>
                  <th className="px-5 py-3.5 font-semibold">محور مهندسی</th>
                  <th className="px-5 py-3.5 font-semibold">پالت رنگی</th>
                  <th className="px-5 py-3.5 font-semibold">بهترین کاربرد</th>
                  <th className="px-5 py-3.5 font-semibold text-left">مشاهده</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredConcepts.map((c) => (
                  <tr
                    key={c.id}
                    className={`transition-colors hover:bg-zinc-50/70 ${
                      c.id === selectedId ? 'bg-[#1D4ED8]/[0.03]' : ''
                    }`}
                  >
                    <td className="px-5 py-3.5 font-semibold text-zinc-950">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.imagePath}
                          alt={c.title}
                          referrerPolicy="no-referrer"
                          className="h-9 w-9 rounded-md border border-zinc-200 object-contain bg-white p-0.5"
                        />
                        <div>
                          <span className="ml-1.5 font-spec text-zinc-400">
                            {c.index}
                          </span>
                          <span>{c.title}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-zinc-600">{c.category}</td>
                    <td className="px-5 py-3.5 text-zinc-600">{c.paletteNote}</td>
                    <td className="px-5 py-3.5 text-zinc-600">{c.bestFor}</td>
                    <td className="px-5 py-3.5 text-left">
                      <button
                        type="button"
                        onClick={() => setLightboxConcept(c)}
                        className="font-medium text-[#1D4ED8] hover:underline whitespace-nowrap"
                      >
                        باز کردن تصویر
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer id="export" className="border-t border-zinc-200 bg-white py-10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
          <div>
            <div className="text-sm font-bold text-zinc-950">
              گالری کانسپت‌های لوگوی انجمن علمی مهندسی کامپیوتر دانشگاه قم
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              شامل ۸۰ تصویر تولیدشده با نانو بنانا — اگر یکی از ترکیب‌های رنگی جدید را پسندیدید، شماره‌اش را بگویید تا روتوش نهایی یا تایپوگرافی روی آن انجام شود.
            </p>
          </div>
          <button
            type="button"
            onClick={() => handleDownloadSelectedImage(selectedConcept)}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-50 whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5" />
            <span>دانلود کانسپت فعلی</span>
          </button>
        </div>
      </footer>

      <ConceptLightboxModal
        concept={lightboxConcept}
        onClose={() => setLightboxConcept(null)}
      />
    </div>
  );
}
