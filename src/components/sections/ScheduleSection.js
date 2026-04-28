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

      {day.items.length === 0 ? (
        <RevealOnScroll>
          <Card className="text-center py-12 max-w-3xl mx-auto">
            <div className="font-display text-xl font-semibold text-ink-dim mb-2">Yakında açıklanacak</div>
            <div className="text-sm text-ink-dim">Bu güne ait detaylı program henüz netleşmedi.</div>
          </Card>
        </RevealOnScroll>
      ) : (
        <div className="relative max-w-5xl mx-auto">
          <div className="hf-timeline-line hidden md:block" />
          {day.items.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 0.05}>
              <div className={`relative md:grid md:grid-cols-2 md:gap-12 ${i === day.items.length - 1 ? '' : 'mb-10'}`}>
                {i % 2 === 0 ? (
                  <>
                    <div className="md:text-right md:pr-12">
                      <div className="font-mono text-xs text-ink-dim mb-1">{item.time}</div>
                      <div className="font-display text-xl font-semibold mb-1">{item.title}</div>
                      <div className="text-ink-dim text-sm">{item.desc}</div>
                    </div>
                    <div className="hidden md:flex absolute left-1/2 top-2 -translate-x-1/2 hf-timeline-dot" style={{ color: item.accent, background: item.accent }} />
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="hidden md:flex absolute left-1/2 top-2 -translate-x-1/2 hf-timeline-dot" style={{ color: item.accent, background: item.accent }} />
                    <div className="md:pl-12">
                      <div className="font-mono text-xs text-ink-dim mb-1">{item.time}</div>
                      <div className="font-display text-xl font-semibold mb-1">{item.title}</div>
                      <div className="text-ink-dim text-sm">{item.desc}</div>
                    </div>
                  </>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      )}
    </div>
  );
}
