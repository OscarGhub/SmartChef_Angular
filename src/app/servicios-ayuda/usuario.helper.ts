export class UsuarioHelper {
  static validarCampos(usuario: any, confirmar_contrasena: string): string | null {
    if (
      !usuario.nombre?.trim() ||
      !usuario.correoElectronico?.trim() ||
      !usuario.contrasena?.trim() ||
      !confirmar_contrasena?.trim() ||
      !usuario.fechaNacimiento
    ) {
      return 'Por favor completa todos los campos antes de continuar.';
    }

    if (usuario.contrasena !== confirmar_contrasena) {
      return 'Las contraseñas deben coincidir.';
    }

    return null;
  }
}
