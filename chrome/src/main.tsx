import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {Base58Page} from "@/pages/base58.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Base58Page/>
    </StrictMode>,
)
