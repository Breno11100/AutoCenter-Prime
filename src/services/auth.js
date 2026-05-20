import { supabase } from "./supabase";

// LOGIN
export async function login(email, senha) {

  const { data, error } =
    await supabase.auth.signInWithPassword({

      email,
      password: senha,

    });

  if (error) {
    return { error };
  }

  const usuario = data.user;

  // BUSCAR PERFIL
  const {
    data: perfil,
    error: erroPerfil

  } = await supabase

    .from("usuarios")

    .select("*")

    .eq("id", usuario.id)

    .single();

  if (erroPerfil) {
    return { error: erroPerfil };
  }

  return {
    usuario,
    perfil,
  };
}

// CADASTRO
export async function cadastrarUsuario(
  nome,
  email,
  senha,
  telefone
) {

  const { data, error } =
    await supabase.auth.signUp({

      email,
      password: senha,

    });

  if (error) {
    return { error };
  }

  const usuario = data.user;

  const { error: erroPerfil } =
    await supabase

      .from("usuarios")

      .insert({

        id: usuario.id,

        nome,

        email,

        telefone,

        tipo: "cliente",

      });

  if (erroPerfil) {
    return { error: erroPerfil };
  }

  return { data };
}

// LOGOUT
export async function logout() {

  return await supabase.auth.signOut();

}

// USUÁRIO LOGADO
export async function usuarioLogado() {

  const { data } =
    await supabase.auth.getUser();

  return data.user;

}