# 1. installation
      git clone https://github.com/maciekkand/cards.git
      cd cards
      fill in api keys in src/firebase.js file
      npm install
      npm run dev

# 2. websites
      https://test-35891.web.app/
      https://test-35891.firebaseapp.com

# 3. unit tests
      npm run test

![](/public/unit.png "Unit tests results")

# 4. e2e tests
      npx playwright test tests/cards.spec.js
      npx playwright show-report

![Alt text](/public/e2e.png "e2e tests results")



