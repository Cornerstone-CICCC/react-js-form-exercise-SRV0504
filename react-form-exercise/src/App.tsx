import { useState } from "react";

type FoodOption = "Chicken" | "Beef" | "Vegetables" | "Dessert" | "Pork";

const FOOD_OPTIONS: FoodOption[] = [
  "Chicken",
  "Beef",
  "Vegetables",
  "Dessert",
  "Pork",
];

const App = () => {
  // Form state (controlled components)
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [age, setAge] = useState<string>(""); // keep as string to allow empty input
  const [favoriteFoods, setFavoriteFoods] = useState<FoodOption[]>([]);

  // Display state
  const [showGreeting, setShowGreeting] = useState<boolean>(false);

  const handleFoodChange = (food: FoodOption, checked: boolean) => {
    setFavoriteFoods((prev) => {
      if (checked) return [...prev, food];
      return prev.filter((f) => f !== food);
    });
  };

  const handleDisplayUser = () => {
    setShowGreeting(true);
  };

  const handleClear = () => {
    setFirstname("");
    setLastname("");
    setAge("");
    setFavoriteFoods([]);
    setShowGreeting(false);
  };

  const fullName = `${firstname.trim()} ${lastname.trim()}`.trim();
  const foodsText =
    favoriteFoods.length > 0 ? favoriteFoods.join(", ") : "None";

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h1>User Form</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="firstname">First Name:</label>
          <br />
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="lastname">Last Name:</label>
          <br />
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="age">Age:</label>
          <br />
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={0}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Favorite Foods:</label>

          {FOOD_OPTIONS.map((food) => {
            const id = food.toLowerCase(); // chicken, beef, etc.
            const isChecked = favoriteFoods.includes(food);

            return (
              <div key={food}>
                <input
                  type="checkbox"
                  id={id}
                  name="favoriteFoods"
                  value={food}
                  checked={isChecked}
                  onChange={(e) => handleFoodChange(food, e.target.checked)}
                />
                <label htmlFor={id} style={{ marginLeft: 8 }}>
                  {food}
                </label>
              </div>
            );
          })}
        </div>
      </form>

      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button type="button" onClick={handleDisplayUser}>
          Display User
        </button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="output" style={{ marginTop: 18 }}>
        {showGreeting && (
          <p>
            Hello {fullName || "User"}. You are {age || "?"} years old and your
            favorite foods are: {foodsText}.
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
