import { BrowserRouter, Route, Routes } from 'react-router'

import { MainLayout } from '../components/layout'
import { AboutPage } from '../pages/AboutPage'
import { CasesPage } from '../pages/CasesPage'
import { FaqPage } from '../pages/FaqPage'
import { HomePage } from '../pages/HomePage'
import { LegalPage } from '../pages/LegalPage'
import { PlansPage } from '../pages/PlansPage'
import { RequestAssessmentPage } from '../pages/RequestAssessmentPage'
import { ThanksPage } from '../pages/ThanksPage'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/planes" element={<PlansPage />} />
          <Route
            path="/solicitar-valoracion"
            element={<RequestAssessmentPage />}
          />
          <Route path="/gracias" element={<ThanksPage />} />
          <Route path="/sobre-mi" element={<AboutPage />} />
          <Route path="/casos" element={<CasesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route
            path="/aviso-legal"
            element={<LegalPage page="legalNotice" />}
          />
          <Route
            path="/privacidad"
            element={<LegalPage page="privacy" />}
          />
          <Route path="/cookies" element={<LegalPage page="cookies" />} />
          <Route
            path="/condiciones"
            element={<LegalPage page="terms" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
