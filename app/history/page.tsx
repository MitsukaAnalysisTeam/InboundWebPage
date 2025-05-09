import { Section } from "@/components/Section";
import { getHistory } from "@/domain/history/historyService";

export default function HistoryPage() {
  const historyEvents = getHistory();

  return (
    <main className="container mx-auto px-4 py-8">
      <Section title="Our History">
        <div className="prose max-w-none mb-8">
          <p className="text-lg">
            From our humble beginnings to becoming a beloved ramen restaurant in Osaka,
            Mitsukabose has been on a journey of continuous growth and innovation.
          </p>
        </div>

        <div className="space-y-8">
          {historyEvents.map((event) => (
            <div key={event.year} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-24 h-24 bg-[#2B2B2B] text-white rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold">{event.year}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
} 