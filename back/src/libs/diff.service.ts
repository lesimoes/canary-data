import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import DiffMatchPatch, { DIFF_DELETE, DIFF_INSERT } from 'diff-match-patch';

export class DiffService {
  private dmp: DiffMatchPatch;
  constructor() {
    this.dmp = new DiffMatchPatch();
  }


  async diff(htmlA: string, htmlB: string): Promise<string> {
    const $A = cheerio.load(htmlA, { xmlMode: true });
    const $B = cheerio.load(htmlB, { xmlMode: true });
    //@ts-ignore
    const ixA = $A('*').filter((_, el) => el.tagName?.startsWith('ix:nonFraction'));
    //@ts-ignore
    const ixB = $B('*').filter((_, el) => el.tagName?.startsWith('ix:nonFraction'));

    ixA.each((i, elA) => {
      const elB = ixB.get(i);
      if (!elB) return;
      const textA = $A(elA).text();
      const textB = $B(elB).text();

      const diffs = this.dmp.diff_main(textA, textB);
      this.dmp.diff_cleanupSemantic(diffs);

      const patched = diffs
        .map(([op, txt]) => {
          const safe = txt;
          if (op === DIFF_INSERT) return `<span class="diff_insert">${safe}</span>`;
          if (op === DIFF_DELETE) return `<span class="diff_delete">${safe}</span>`;
          return safe;
        })
        .join('');

      $A(elA).html(patched);
    });
    return $A.html();
  }
}
