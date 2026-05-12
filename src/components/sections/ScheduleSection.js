import { Container } from '@/components/layout/Container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { RevealOnScroll } from '@/components/effects/RevealOnScroll';
import { schedule, SCHEDULE_TBA_NOTE } from '@/data/schedule';

export function ScheduleSection() {
  return (
    <section id="program" className="relative z-10 py-24 lg:py-32 border-t border-white/5">
      <Container>
        <RevealOnScroll>
          <SectionTitle
            eyebrow="Program Akışı"
            title="İki gün,"
            gradient="tek bir misyon."
            className="mb-6"
          />
          <p className="text-ink-dim text-center max-w-2xl mx-auto mb-16">{SCHEDULE_TBA_NOTE}</p>
        </RevealOnScroll>

        {schedule.map((day, dayIdx) => (
          <ScheduleDay key={day.id} day={day} isLast={dayIdx === schedule.length - 1} />
        ))}
      </Container>
    </section>
  );
}

export function ScheduleDay({ day, isLast }) {
  const sections = day.sections || [{ id: 'program', title: day.title, items: day.items || [] }];
  const hasItems = sections.some(section => section.items.length > 0);

  return (
    <div className={isLast ? '' : 'mb-20'}>
      <RevealOnScroll>
        <div className="flex items-center gap-4 mb-10">
          <div className="font-display text-6xl md:text-7xl font-bold" style={{ color: day.color }}>
            {day.dayNumber}
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-ink-dim">Gün {day.id === 'day-1' ? 1 : 2}</div>
            <div className="font-display text-2xl font-bold">{day.month} · {day.dayName}</div>
          </div>
        </div>
      </RevealOnScroll>

      {!hasItems ? (
        <RevealOnScroll>
          <Card className="text-center py-12 max-w-3xl mx-auto">
            <div className="font-display text-xl font-semibold text-ink-dim mb-2">Yakında açıklanacak</div>
            <div className="text-sm text-ink-dim">Bu güne ait detaylı program henüz netleşmedi.</div>
          </Card>
        </RevealOnScroll>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {sections.map((section, sectionIdx) => (
            <RevealOnScroll key={section.id} delay={sectionIdx * 0.08}>
              <ScheduleGroup section={section} />
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  );
}

function ScheduleGroup({ section }) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
      <div className="text-xs uppercase tracking-[0.22em] text-ink-dim mb-5">{section.title}</div>
      <div className="space-y-5">
        {section.items.map((item, i) => (
          <div key={i} className="relative pl-6">
            <div
              className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full"
              style={{ background: item.accent }}
            />
            {i !== section.items.length - 1 && (
              <div className="absolute left-[4px] top-5 bottom-[-1.25rem] w-px bg-white/10" />
            )}
            <div className="font-mono text-xs text-ink-dim mb-1">{item.time}</div>
            <div className="font-display text-lg md:text-xl font-semibold mb-1">{item.title}</div>
            <div className="text-ink-dim text-sm">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
