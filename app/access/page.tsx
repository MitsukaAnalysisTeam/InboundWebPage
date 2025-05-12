import { getAccessInfo } from '@/domain/services/dataService';

export default function AccessPage() {
  const accessInfo = getAccessInfo();

  return (
    <main>
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Access</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-gray-600">{accessInfo.station}</p>
            <p className="text-gray-600">Walking time: {accessInfo.walkTime}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Map</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={accessInfo.mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
} 