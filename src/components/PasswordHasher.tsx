import { useState, useCallback } from 'react'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const HASH_LENGTH = 8

async function hashPasswordLetters(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const bytes = new Uint8Array(hashBuffer)
  let out = ''
  for (let i = 0; i < HASH_LENGTH; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length]
  }
  return out
}

export default function PasswordHasher() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [hash, setHash] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = useCallback(async () => {
    if (!password) return
    setLoading(true)
    const result = await hashPasswordLetters(password)
    setHash(result)
    setLoading(false)
  }, [password])

  const handleCopy = useCallback(async () => {
    if (!hash) return
    await navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [hash])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleGenerate()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 mb-4 shadow-lg">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Password Hash Generator</h1>
        <p className="mt-2 text-gray-500 text-sm">Convert any text to a short, letters-only hash</p>
      </div>

      {/* Input card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Password or text to hash</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter password…"
            className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 placeholder-gray-400 font-mono text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!password || loading}
          className="mt-4 w-full py-3 px-6 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          {loading ? 'Generating…' : 'Generate Hash'}
        </button>
      </div>

      {/* Result */}
      {hash && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Short hash · letters only</span>
            <button
              onClick={handleCopy}
              className="text-xs text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-1"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div
            className="bg-gray-50 rounded-lg px-4 py-3 font-mono text-2xl tracking-widest text-center text-gray-800 border border-gray-100 cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
            onClick={handleCopy}
            title="Click to copy"
          >
            {hash}
          </div>

          {/* Security note */}
          <div className="mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3">
            <svg className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-xs text-amber-700">
              For password storage use a dedicated KDF (bcrypt, Argon2, scrypt) server-side — never plain SHA hashes.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
