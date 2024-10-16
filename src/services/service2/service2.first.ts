/**
 * Service that provides methods to work with users.
 *
 * @class Service1Second
 * @hideconstructor
 */
class Service2First {
  getUsers(): Array<{ id: number; name: string }> {
    return [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ];
  }

  getUserById(id: number): { id: number; name: string } | null {
    const users = this.getUsers();
    return users.find((user) => user.id === id) || null;
  }
}

export default Service2First;
