export default function CompanySignUpForm({ setInput, user }) {
  <form className="flex flex-col bg-transparent">
    <input
      onChange={setInput}
      name="company_name"
      type="text"
      placeholder="Enter Company Name"
      className="border border-text2 p-3 rounded-lg m-3 w-80"
      value={user.company_name}
    />
    <input
      onChange={setInput}
      name="email"
      type="email"
      placeholder="Enter Email"
      className="border border-text2 p-3 rounded-lg m-3"
      value={user.email}
    />
    <input
      onChange={setInput}
      name="password"
      type="password"
      placeholder="Enter Password"
      className="border border-text2 p-3 rounded-lg m-3"
      value={user.password}
    />
    <input
      onChange={setInput}
      name="phone_number"
      type="text"
      placeholder="Enter phone number"
      className="border border-text2 p-3 rounded-lg m-3"
      value={user.phone_number}
    />
  </form>;
}
