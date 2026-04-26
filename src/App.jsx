import { createSignal, onMount } from "solid-js";

function App() {
  const [nombre, setNombre] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [lista, setLista] = createSignal([]);

  const API = "http://localhost/solidweb/backend-php/api.php";

  // 🔹 Obtener datos al cargar
  const cargarDatos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setLista(data);
  };

  onMount(cargarDatos);

  // 🔹 Enviar datos
  const enviar = async () => {
    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre(),
        email: email()
      })
    });

    setNombre("");
    setEmail("");
    cargarDatos(); // actualizar tabla
  };

  return (
    <div style={{ padding: "20px", "font-family": "Arial" }}>
      <h1>Registro de Usuarios 🚀</h1>

      <input
        placeholder="Nombre"
        value={nombre()}
        onInput={(e) => setNombre(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email()}
        onInput={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={enviar}>Guardar</button>

      <h2>Lista de usuarios</h2>

      <table border="1" cellpadding="10">
        <tr>
          <th>Nombre</th>
          <th>Email</th>
        </tr>

        {lista().map((item) => (
          <tr>
            <td>{item.nombre}</td>
            <td>{item.email}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
