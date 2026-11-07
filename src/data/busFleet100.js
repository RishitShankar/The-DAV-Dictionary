/**
 * DAV Public School Khabra - 100-Bus Fleet Master Database
 * Buses 1 to 100 with comprehensive routes across Muzaffarpur, Bihar
 * Dimension 7: Bus Driver & Administrator Fleet Radar
 */

// Popular routes mapped across Muzaffarpur districts
const FLEET_ROUTES = [
  'Ramdayalu ➔ Aghoria Bazar ➔ Mithanpura ➔ DAV Khabra',
  'Zero Mile ➔ Mirzapur ➔ Bakhri ➔ DAV Khabra',
  'Bhagwanpur ➔ Gobarsahi ➔ Dumri ➔ DAV Khabra',
  'Bairia Bus Stand ➔ Brahmpura ➔ Kalambagh Road ➔ DAV Khabra',
  'Kanti ➔ Narsinghpur ➔ Motipur Road ➔ DAV Khabra',
  'Sakra ➔ Dholi ➔ Pusa Road ➔ DAV Khabra',
  'SKMCH Medical College ➔ Ahiyapur ➔ Zero Mile ➔ DAV Khabra',
  'Marwan ➔ Saraiya Road ➔ Khabra NH-28 ➔ DAV Khabra',
  'Bela Industrial Area ➔ Mithanpura Chowk ➔ DAV Khabra',
  'Damodarpur ➔ Chhata Chowk ➔ Kalyani ➔ DAV Khabra',
  'Bochahan ➔ Majhauli ➔ Mirzapur ➔ DAV Khabra',
  'Khabra Mandir ➔ Bakhri Chowk ➔ DAV Khabra Gate 1',
  'L.S. College ➔ Club Road ➔ Ramdayalu ➔ DAV Khabra',
  'R.D.S. College ➔ Goshala Road ➔ Ramdayalu ➔ DAV Khabra',
  'Maniari ➔ Silaut ➔ Khabra South ➔ DAV Khabra',
  'Musahari ➔ Rohua ➔ Mithanpura ➔ DAV Khabra',
  'Kurhani ➔ Turki ➔ Ramdayalu ➔ DAV Khabra',
  'Kalyanpur ➔ Patahi ➔ Bhagwanpur ➔ DAV Khabra',
  'Rewa Road ➔ Saraiya ➔ Marwan ➔ DAV Khabra',
  'Juran Chhapra ➔ Company Bagh ➔ Aghoria Bazar ➔ DAV Khabra'
];

const DRIVER_SURNAMES = ['Singh', 'Yadav', 'Pandey', 'Sharma', 'Mishra', 'Kumar', 'Choudhary', 'Paswan', 'Thakur', 'Verma', 'Gupta', 'Rai'];
const DRIVER_FIRSTNAMES = ['Rajesh', 'Ramesh', 'Dharmendra', 'Manoj', 'Suresh', 'Mukesh', 'Mahesh', 'Santosh', 'Dinesh', 'Ajay', 'Vijay', 'Sunil', 'Anil', 'Pankaj', 'Satish', 'Ramdev', 'Lallan', 'Devendra', 'Bijender', 'Ashok'];

function generatePlateNumber(num) {
  const pad = String(num).padStart(4, '0');
  const series = num <= 30 ? 'P' : num <= 70 ? 'PA' : 'PB';
  return `BR-06-${series}-${pad}`;
}

function generateDefaultBusFleet() {
  const fleet = [];
  for (let i = 1; i <= 100; i++) {
    const route = FLEET_ROUTES[(i - 1) % FLEET_ROUTES.length];
    const fName = DRIVER_FIRSTNAMES[(i * 3) % DRIVER_FIRSTNAMES.length];
    const sName = DRIVER_SURNAMES[(i * 5) % DRIVER_SURNAMES.length];
    const driverName = `Shri ${fName} ${sName}`;
    const busPad = String(i).padStart(2, '0');
    const busId = `BUS-${busPad}`;

    // Status distribution
    const isMoving = i % 3 === 1;
    const isAtSchool = i % 3 === 2;
    const status = isMoving ? 'moving' : isAtSchool ? 'at_school' : 'standby';
    const speed = isMoving ? 28 + (i % 12) : 0;
    const capacity = 42 + ((i % 4) * 4); // 42, 46, 50, 54
    const kids = isMoving ? Math.floor(capacity * 0.85) : isAtSchool ? capacity : 0;

    fleet.push({
      busNumber: i,
      busId: busId,
      busCode: `Bus No. ${busPad}`,
      plateNumber: generatePlateNumber(i),
      model: i % 2 === 0 ? 'Tata Starbus 44-Seater (School Spec)' : 'Eicher Skyline Pro 48-Seater',
      routeTitle: route,
      driverName: driverName,
      driverPhone: `+91 94310 ${String(10000 + i * 83).slice(0, 5)}`,
      attendantName: `Shri ${DRIVER_FIRSTNAMES[(i * 7) % DRIVER_FIRSTNAMES.length]} Sahni`,
      attendantPhone: `+91 98350 ${String(20000 + i * 67).slice(0, 5)}`,
      status: status,
      currentSpeed: speed,
      currentLocationName: isMoving ? `${route.split('➔')[1]?.trim() || 'En Route to Khabra'}` : isAtSchool ? 'DAV Khabra Main Campus (Gate 2)' : 'Depot / Standby Area',
      destinationDistanceKm: isMoving ? Math.round((2.5 + (i % 8) * 0.9) * 10) / 10 : isAtSchool ? 0 : 6.5,
      etaMinutes: isMoving ? Math.round((5 + (i % 12))) : isAtSchool ? 0 : 25,
      kidsOnboard: kids,
      totalCapacity: capacity,
      cctvStatus: 'Active (4 Cameras HD)',
      speedGovernor: 'Active (Max 40 km/h)',
      acStatus: i % 3 === 0 ? 'Fully Air-Conditioned' : 'Air Cooled & High Ventilation',
      hasDriverAccount: i === 1, // Bus 1 has default driver
      driverAccountId: i === 1 ? 'driver_bus_01' : null
    });
  }
  return fleet;
}

// 1. Get entire 100-bus fleet (with local storage override)
export function getFleet100() {
  if (typeof window === 'undefined') return generateDefaultBusFleet();
  try {
    const saved = localStorage.getItem('dav_fleet_100_v1');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 100) {
        return parsed;
      }
    }
  } catch (e) {}

  const defaults = generateDefaultBusFleet();
  try {
    localStorage.setItem('dav_fleet_100_v1', JSON.stringify(defaults));
  } catch (e) {}
  return defaults;
}

// 2. Save updated fleet
export function saveFleet100(fleet) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('dav_fleet_100_v1', JSON.stringify(fleet));
  } catch (e) {}
}

// 3. Update single bus status or driver
export function updateBusInFleet(busNumber, updates) {
  const fleet = getFleet100();
  const idx = fleet.findIndex(b => b.busNumber === Number(busNumber));
  if (idx !== -1) {
    fleet[idx] = { ...fleet[idx], ...updates };
    saveFleet100(fleet);
    return fleet[idx];
  }
  return null;
}
