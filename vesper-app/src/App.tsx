import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'

const WelcomeScreen = lazy(() => import('./screens/01-Welcome/WelcomeScreen'))
const SetYourSkyScreen = lazy(() => import('./screens/02-SetYourSky/SetYourSkyScreen'))
const CalibrateScreen = lazy(() => import('./screens/03-Calibrate/CalibrateScreen'))
const TonightScreen = lazy(() => import('./screens/04-Tonight/TonightScreen'))
const SkyMapScreen = lazy(() => import('./screens/05-SkyMap/SkyMapScreen'))
const OrreryScreen = lazy(() => import('./screens/06-Orrery/OrreryScreen'))
const ObjectDetailScreen = lazy(() => import('./screens/07-ObjectDetail/ObjectDetailScreen'))
const ConstellationDetailScreen = lazy(() => import('./screens/08-ConstellationDetail/ConstellationDetailScreen'))
const DeepSkyDetailScreen = lazy(() => import('./screens/09-DeepSkyDetail/DeepSkyDetailScreen'))
const EventsScreen = lazy(() => import('./screens/10-Events/EventsScreen'))
const EventDetailScreen = lazy(() => import('./screens/11-EventDetail/EventDetailScreen'))
const MoonScreen = lazy(() => import('./screens/12-Moon/MoonScreen'))
const SunTwilightScreen = lazy(() => import('./screens/13-SunTwilight/SunTwilightScreen'))
const PassesScreen = lazy(() => import('./screens/14-Passes/PassesScreen'))
const SkyConditionsScreen = lazy(() => import('./screens/15-SkyConditions/SkyConditionsScreen'))
const ObservationLogScreen = lazy(() => import('./screens/16-ObservationLog/ObservationLogScreen'))
const AddObservationScreen = lazy(() => import('./screens/17-AddObservation/AddObservationScreen'))
const SettingsScreen = lazy(() => import('./screens/18-Settings/SettingsScreen'))

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100vh', background: '#0D1320', color: '#E6BE7A',
      fontFamily: '"Fraunces", serif', fontSize: 20
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 12, opacity: 0.6, fontSize: 13, letterSpacing: '0.2em', fontFamily: '"Hanken Grotesk", sans-serif', textTransform: 'uppercase' }}>VESPER</div>
        <div>Loading…</div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/set-your-sky" element={<SetYourSkyScreen />} />
        <Route path="/calibrate" element={<CalibrateScreen />} />
        <Route path="/tonight" element={<TonightScreen />} />
        <Route path="/sky-map" element={<SkyMapScreen />} />
        <Route path="/orrery" element={<OrreryScreen />} />
        <Route path="/object-detail" element={<ObjectDetailScreen />} />
        <Route path="/constellation-detail" element={<ConstellationDetailScreen />} />
        <Route path="/deep-sky-detail" element={<DeepSkyDetailScreen />} />
        <Route path="/events" element={<EventsScreen />} />
        <Route path="/event-detail" element={<EventDetailScreen />} />
        <Route path="/moon" element={<MoonScreen />} />
        <Route path="/sun-twilight" element={<SunTwilightScreen />} />
        <Route path="/passes" element={<PassesScreen />} />
        <Route path="/sky-conditions" element={<SkyConditionsScreen />} />
        <Route path="/observation-log" element={<ObservationLogScreen />} />
        <Route path="/add-observation" element={<AddObservationScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
