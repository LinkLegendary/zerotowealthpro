export default function ResourceLinks() {
  return (
    <div className="my-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4">📚 Want More?</h3>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-xl">📺</span>
          <p className="text-gray-700">
            <a 
              href="https://youtube.com/@yourchannel" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#4472C4] font-medium hover:underline"
            >
              Watch my debt payoff playlist
            </a>
            {' '}for visual walkthroughs
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-xl">📧</span>
          <p className="text-gray-700">
            <a 
              href="/signup" 
              className="text-[#4472C4] font-medium hover:underline"
            >
              Join the email list
            </a>
            {' '}for new guides every week
          </p>
        </div>
        
        <div className="flex items-start gap-3">
          <span className="text-xl">🧮</span>
          <p className="text-gray-700">
            <a 
              href="https://zerowealthacademy.gumroad.com/l/DebtCalculatorPlus" 
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="text-[#4472C4] font-medium hover:underline"
            >
              Download the debt calculator
            </a>
            {' '}to build your payoff plan
          </p>
        </div>
      </div>
    </div>
  )
}