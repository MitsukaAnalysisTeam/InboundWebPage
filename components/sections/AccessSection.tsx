import { getAccessInfo } from '@/domain/services/dataService';

export default function AccessSection() {
  const accessInfo = getAccessInfo();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Access</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <iframe
              src={accessInfo.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Nearest Station</h3>
                <p className="text-lg">{accessInfo.station}</p>
                <p className="text-gray-600">{accessInfo.walkTime} walk</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-lg">
                  2F, Airport Center Building,<br />
                  1-6-5 Hotarugaike Higashimachi,<br />
                  Toyonaka, Osaka 560-0036, Japan
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Business Hours</h3>
                <p className="text-lg">Wed–Sat: 11:30–23:00 (Last order 23:00)</p>
                <p className="text-lg">Sun & Holidays: 11:30–21:30 (Last order 21:30)</p>
                <p className="text-gray-600 mt-2">Closed on Monday and Tuesday</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 