import React, {useEffect, useRef, useState} from 'react';
import {Check, RefreshCw, Upload} from 'lucide-react';
import {LogoConcept} from '../types/logo';

const DEFAULT_UNI_LOGO = '/assets/aistudio/image_489f4e8f.png';

interface UniversityMatcherProps {
  selectedConcept: LogoConcept;
  associationName: string;
  universityName: string;
}

export const UniversityMatcher: React.FC<UniversityMatcherProps> = ({
  selectedConcept,
  associationName,
  universityName,
}) => {
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [blendWhiteBg, setBlendWhiteBg] = useState<boolean>(true);
  const [uniScale, setUniScale] = useState<number>(100);
  const [pairLayout, setPairLayout] = useState<'lockup' | 'letterhead' | 'badge'>('lockup');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (uploadedLogoUrl) {
        URL.revokeObjectURL(uploadedLogoUrl);
      }
    };
  }, [uploadedLogoUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (uploadedLogoUrl) URL.revokeObjectURL(uploadedLogoUrl);
    const url = URL.createObjectURL(file);
    setUploadedLogoUrl(url);
    setUploadedFileName(file.name);
  };

  const resetUploadedLogo = () => {
    if (uploadedLogoUrl) URL.revokeObjectURL(uploadedLogoUrl);
    setUploadedLogoUrl(null);
    setUploadedFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const activeUniImage = uploadedLogoUrl || DEFAULT_UNI_LOGO;

  return (
    <section
      id="university-match"
      className="border-t border-zinc-200 bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-zinc-500">
              تطبیق هویت سازمانی · هم‌نشینی با نشان دانشگاه قم
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 md:text-3xl [text-wrap:balance]">
              آزمایش هم‌نشینی کانسپت انتخابی کنار لوگوی دانشگاه قم
            </h2>
            <p className="mt-2 text-sm leading-7 text-zinc-600">
              نحوه قرارگیری تصویر تولیدشده «{selectedConcept.title}» را در قفل افقی، سربرگ اداری و کارت رویداد در کنار لوگوی اصلی دانشگاه قم بررسی کنید.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-zinc-100 p-1 self-start">
            <button
              type="button"
              onClick={() => setPairLayout('lockup')}
              className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                pairLayout === 'lockup'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              قفل افقی دوگانه
            </button>
            <button
              type="button"
              onClick={() => setPairLayout('letterhead')}
              className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                pairLayout === 'letterhead'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              سربرگ رسمی
            </button>
            <button
              type="button"
              onClick={() => setPairLayout('badge')}
              className={`whitespace-nowrap shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                pairLayout === 'badge'
                  ? 'bg-white text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              پوستر / کارت رویداد
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-zinc-200 bg-[#FAFAFA] p-6">
            <div>
              <h3 className="text-base font-semibold text-zinc-900">
                نشان مرجع دانشگاه و تنظیمات هم‌ترازی
              </h3>

              <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-zinc-100 bg-white p-1.5">
                    <img
                      src={activeUniImage}
                      alt="نشان دانشگاه قم"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-xs leading-6 text-zinc-700">
                    <div className="flex items-center gap-1.5 font-semibold text-zinc-900">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span>
                        {uploadedLogoUrl
                          ? 'نسخه سفارشی جایگزین شد'
                          : 'لوگوی اصلی دانشگاه قم فعال است'}
                      </span>
                    </div>
                    <p className="mt-0.5 truncate text-zinc-500">
                      {uploadedLogoUrl
                        ? uploadedFileName
                        : 'مرجع اصلی طراحی ۸۰ کانسپت نانو بنانا'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                  id="uni-logo-upload"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <label
                    htmlFor="uni-logo-upload"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-800 transition-colors hover:bg-zinc-100 whitespace-nowrap shrink-0"
                  >
                    <Upload className="h-4 w-4" />
                    <span>آپلود نسخه دیگر (PNG / JPG)</span>
                  </label>
                  {uploadedLogoUrl && (
                    <button
                      type="button"
                      onClick={resetUploadedLogo}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-100 whitespace-nowrap shrink-0"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>بازگشت به لوگوی قم</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-zinc-200 pt-5">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-700">
                    <label htmlFor="uni-scale-slider" className="font-medium">
                      تنظیم اندازه نشان دانشگاه
                    </label>
                    <span className="font-spec text-zinc-500">{uniScale}%</span>
                  </div>
                  <input
                    id="uni-scale-slider"
                    type="range"
                    min={65}
                    max={135}
                    value={uniScale}
                    onChange={(e) => setUniScale(Number(e.target.value))}
                    className="mt-2 h-1.5 w-full cursor-pointer accent-[#1D4ED8]"
                  />
                </div>

                <label className="flex cursor-pointer items-center justify-between text-xs text-zinc-700">
                  <span>ادغام پس‌زمینه سفید لوگوها (Multiply)</span>
                  <input
                    type="checkbox"
                    checked={blendWhiteBg}
                    onChange={(e) => setBlendWhiteBg(e.target.checked)}
                    className="h-4 w-4 accent-[#1D4ED8]"
                  />
                </label>
              </div>
            </div>

            <p className="mt-6 text-xs leading-6 text-zinc-500">
              به دلیل ساخت کانسپت‌ها مستقیماً از روی تصویر لوگوی دانشگاه قم، تناسب ابعادی و انحنای آن‌ها در کنار نشان اصلی کاملاً هماهنگ است.
            </p>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 md:p-8">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4 text-xs text-zinc-500">
              <span>پیش‌نمایش هم‌نشینی زنده</span>
              <span>
                کانسپت فعال: <strong className="text-zinc-900">{selectedConcept.title}</strong>
              </span>
            </div>

            <div className="my-auto py-10 flex items-center justify-center">
              {pairLayout === 'lockup' && (
                <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                  <img
                    src={activeUniImage}
                    alt="نشان دانشگاه قم"
                    referrerPolicy="no-referrer"
                    style={{
                      width: `${Math.round(92 * (uniScale / 100))}px`,
                      height: `${Math.round(92 * (uniScale / 100))}px`,
                    }}
                    className={`object-contain ${blendWhiteBg ? 'mix-blend-multiply' : ''}`}
                  />

                  <div className="h-16 w-px bg-zinc-200" aria-hidden="true" />

                  <div className="flex items-center gap-4">
                    <img
                      src={selectedConcept.imagePath}
                      alt={selectedConcept.title}
                      referrerPolicy="no-referrer"
                      className={`h-24 w-24 object-contain ${
                        blendWhiteBg ? 'mix-blend-multiply' : ''
                      }`}
                    />
                    <div className="text-right">
                      <div className="text-base font-bold text-zinc-950">
                        {associationName}
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-500">
                        {universityName || 'دانشگاه قم'}
                      </div>
                      <div className="mt-1 font-latin text-[11px] font-medium tracking-wide text-zinc-400">
                        Computer Engineering Scientific Association
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {pairLayout === 'letterhead' && (
                <div className="w-full max-w-lg rounded-lg border border-zinc-200 bg-[#FDFDFD] p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedConcept.imagePath}
                        alt={selectedConcept.title}
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 object-contain mix-blend-multiply"
                      />
                      <div>
                        <div className="text-xs font-bold text-zinc-950">
                          {associationName}
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          {universityName || 'دانشگاه قم'}
                        </div>
                      </div>
                    </div>

                    <img
                      src={activeUniImage}
                      alt="نشان دانشگاه قم"
                      referrerPolicy="no-referrer"
                      className="h-12 w-12 object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="mt-5 space-y-2.5 text-right">
                    <div className="flex justify-between text-[11px] text-zinc-400 font-spec">
                      <span>شماره: ۱۴۰۵/م‌ک/۱۴</span>
                      <span>تاریخ: آبان ۱۴۰۵</span>
                    </div>
                    <div className="h-2.5 w-3/4 rounded bg-zinc-100" />
                    <div className="h-2.5 w-full rounded bg-zinc-100" />
                    <div className="h-2.5 w-5/6 rounded bg-zinc-100" />
                    <div className="pt-4 text-[11px] text-zinc-400">
                      پیش‌نمایش توازن بصری سربرگ اداری و مکاتبات رسمی انجمن علمی مهندسی کامپیوتر دانشگاه قم
                    </div>
                  </div>
                </div>
              )}

              {pairLayout === 'badge' && (
                <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white/80">
                      رویداد تخصصی معماری سیستم و مهندسی کامپیوتر
                    </span>
                    <div className="rounded-lg bg-white p-1.5">
                      <img
                        src={activeUniImage}
                        alt="نشان دانشگاه قم"
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-5">
                    <div className="rounded-xl bg-white p-2">
                      <img
                        src={selectedConcept.imagePath}
                        alt={selectedConcept.title}
                        referrerPolicy="no-referrer"
                        className="h-20 w-20 object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-lg font-bold tracking-tight text-white">
                        {associationName}
                      </div>
                      <div className="mt-1 text-xs text-white/80">
                        {universityName || 'دانشگاه قم'}
                      </div>
                      <div className="mt-2 font-latin text-[11px] text-white/65">
                        University of Qom · Computer Engineering Chapter
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-100 pt-4 text-xs text-zinc-500 flex flex-wrap items-center justify-between gap-2">
              <span>مقایسه مستقیم هم‌ترازی وزنی با آرم دانشگاه قم</span>
              <span className="font-spec text-[11px] text-zinc-400" dir="ltr">
                Nano Banana Concept #{selectedConcept.index}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
