import React, {useEffect, useState} from 'react';
import {Download, X} from 'lucide-react';
import {LogoConcept} from '../types/logo';

const QOM_EMBLEM_SRC = '/assets/aistudio/image_489f4e8f.png';

interface ConceptLightboxModalProps {
  concept: LogoConcept | null;
  onClose: () => void;
}

export const ConceptLightboxModal: React.FC<ConceptLightboxModalProps> = ({
  concept,
  onClose,
}) => {
  const [compareOriginal, setCompareOriginal] = useState(true);

  useEffect(() => {
    if (!concept) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [concept, onClose]);

  if (!concept) return null;

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = concept.imagePath;
    link.download = `qom-ce-concept-${concept.index}-${concept.id}.jpg`;
    link.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 p-4 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
    >
      <div
        className="w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="font-spec text-xs font-medium text-zinc-400">
              {concept.index}
            </span>
            <h3 id="lightbox-title" className="text-lg font-bold text-zinc-950">
              {concept.title}
            </h3>
            <span className="font-latin text-xs text-zinc-400" dir="ltr">
              {concept.latinTitle}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="بستن پنجره"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-7 flex flex-col justify-between bg-[#FAFAFA] p-6 md:p-8">
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-zinc-700">
                <input
                  type="checkbox"
                  checked={compareOriginal}
                  onChange={(e) => setCompareOriginal(e.target.checked)}
                  className="h-4 w-4 accent-[#1D4ED8]"
                />
                <span>مقایسه کنار لوگوی اصلی دانشگاه قم</span>
              </label>
              <span className="font-spec text-xs text-zinc-400">1:1 · Nano Banana</span>
            </div>

            <div className="my-6 flex items-center justify-center gap-6">
              <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white p-3 shadow-xs">
                <img
                  src={concept.imagePath}
                  alt={concept.title}
                  referrerPolicy="no-referrer"
                  className="h-64 w-64 object-contain sm:h-72 sm:w-72"
                />
              </div>

              {compareOriginal && (
                <div className="hidden sm:flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white p-3">
                  <img
                    src={QOM_EMBLEM_SRC}
                    alt="لوگوی اصلی دانشگاه قم"
                    referrerPolicy="no-referrer"
                    className="h-28 w-28 object-contain opacity-90"
                  />
                  <span className="text-[11px] font-medium text-zinc-500">
                    نشان مرجع دانشگاه
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-200 pt-4">
              <p className="mb-3 text-[11px] text-zinc-500">
                بررسی خوانایی تصویر در ابعاد کوچک (پروفایل، آیکون و چاپ):
              </p>
              <div className="flex items-end justify-between gap-4">
                {[
                  {px: 72, label: '۷۲px پروفایل'},
                  {px: 48, label: '۴۸px هدر'},
                  {px: 32, label: '۳۲px آیکون'},
                  {px: 20, label: '۲۰px کوچک'},
                ].map((item) => (
                  <div key={item.px} className="flex flex-col items-center gap-1.5">
                    <div className="flex items-center justify-center rounded-lg border border-zinc-200 bg-white p-1.5">
                      <img
                        src={concept.imagePath}
                        alt={`${concept.title} ${item.label}`}
                        referrerPolicy="no-referrer"
                        style={{width: `${item.px}px`, height: `${item.px}px`}}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-spec text-[10px] text-zinc-500">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between p-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-zinc-400">دسته و پالت</p>
                <p className="mt-1 text-sm font-medium text-zinc-900">
                  {concept.category} · {concept.paletteNote}
                </p>
              </div>
              <div className="border-t border-zinc-100 pt-3">
                <p className="text-xs font-medium text-zinc-400">پیوند با لوگوی دانشگاه قم</p>
                <p className="mt-1 text-sm leading-6 text-zinc-700">
                  {concept.universityLink}
                </p>
              </div>
              <div className="border-t border-zinc-100 pt-3">
                <p className="text-xs font-medium text-zinc-400">المان مهندسی کامپیوتر</p>
                <p className="mt-1 text-sm leading-6 text-zinc-700">
                  {concept.engineeringLink}
                </p>
              </div>
              <div className="border-t border-zinc-100 pt-3">
                <p className="text-xs font-medium text-zinc-400">بهترین کاربردها</p>
                <p className="mt-1 text-sm leading-6 text-zinc-700">
                  {concept.bestFor}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-zinc-200 pt-4">
              <button
                type="button"
                onClick={handleDownloadImage}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#1D4ED8] px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-[#1E40AF] whitespace-nowrap"
              >
                <Download className="h-4 w-4" />
                <span>دانلود تصویر باکیفیت کانسپت</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
