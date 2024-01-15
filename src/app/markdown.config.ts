import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

const customImage = (href: string, title: string | null, text: string) => {
  return `
  <figure class="flex flex-col items-center m-0 px-2 py-3 space-y-2 rounded-lg border border-solid border-slate-300">
    <img src="${href}" class="max-w-full w-auto h-auto" alt="${text}" />
    <figcaption class="text-base italic">${title ? title : ''}</figcaption>
  </figure>
  `;
};

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.image = customImage;

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
  };
}
