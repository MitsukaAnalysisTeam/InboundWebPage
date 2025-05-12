import { getHistoryEvents } from '@/domain/services/dataService';
export default function HistoryPage() {
  const historyEvents = getHistoryEvents();

  return (
    <main>
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Our History</h1>
      
      <div className="space-y-8">
        {historyEvents.map((event) => (
          <div key={event.year} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-24 h-24 bg-[#2B2B2B] text-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">{event.year}</span>
              </div>
              <div>
                <p className="text-lg">{event.event}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </main>
  );
} 