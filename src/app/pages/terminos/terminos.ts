import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

interface Seccion {
  id: string;
  titulo: string;
  parrafos?: string[];
  lista?: string[];
}

@Component({
  imports: [RouterLink, MatButtonModule],
  selector: 'app-terminos',
  styleUrl: './terminos.css',
  templateUrl: './terminos.html',
})
export class Terminos {
  readonly actualizado = '19 de noviembre de 2026';

  readonly resumen = [
    { titulo: 'Proyecto académico', texto: 'EventSales se desarrolló con fines educativos. No es un servicio comercial.' },
    { titulo: 'Pagos simulados', texto: 'No se realiza ningún cobro real ni se mueve dinero.' },
    { titulo: 'Entradas sin validez', texto: 'Las entradas generadas no dan acceso a eventos reales.' },
    { titulo: 'IA con límites', texto: 'El agente HampCode puede equivocarse: verifica la información importante.' },
  ];

  readonly secciones: Seccion[] = [
    {
      id: 'aceptacion',
      titulo: 'Aceptación de los términos',
      parrafos: [
        'Al crear una cuenta o usar EventSales aceptas estos términos y condiciones. Si no estás de acuerdo con alguno de ellos, no uses la plataforma.',
      ],
    },
    {
      id: 'proyecto',
      titulo: 'Naturaleza del proyecto',
      parrafos: [
        'EventSales es un proyecto académico desarrollado con fines de aprendizaje y demostración por Henry Antonio Mendoza Puerta by hampcode.',
      ],
      lista: [
        'No es una empresa ni un servicio comercial.',
        'No vende entradas reales ni intermedia con organizadores de eventos reales.',
        'Los eventos, organizadores, precios e imágenes son datos de demostración o referenciales.',
        'La plataforma puede modificarse, reiniciarse o dejar de estar disponible en cualquier momento y sin aviso.',
      ],
    },
    {
      id: 'servicio',
      titulo: 'Qué ofrece la plataforma',
      lista: [
        'Publicar y editar eventos (cuentas de organizador).',
        'Buscar y consultar eventos por nombre o ciudad, con su fecha, precio y cupos.',
        'Reservar y pagar entradas de forma simulada (cuentas de participante).',
        'Consultar tus entradas y anular las que aún no pagaste, en Mis entradas.',
        'Reportes de ventas para organizadores: gráfico comparativo y descarga en Excel.',
        'Un agente de inteligencia artificial, HampCode, para consultar eventos, comprar entradas y resolver dudas sobre las políticas.',
      ],
    },
    {
      id: 'cuentas',
      titulo: 'Cuentas y roles',
      parrafos: ['Existen dos tipos de cuenta: participante y organizador. Tu rol determina qué puedes hacer en la plataforma.'],
      lista: [
        'Proporciona datos veraces al registrarte.',
        'Protege tu contraseña y no la compartas. Se guarda cifrada.',
        'Eres responsable de la actividad que ocurra en tu cuenta.',
        'Un participante no accede a reportes de ventas y un organizador no compra entradas.',
        'Cada usuario accede únicamente a su propia información.',
      ],
    },
    {
      id: 'compras',
      titulo: 'Compras y pagos (simulados)',
      lista: [
        'Se compra una entrada por vez.',
        'El precio es el precio base del evento al momento de la compra y no cambia después.',
        'No se pueden comprar entradas de un evento que ya pasó ni de un evento agotado.',
        'Los métodos de pago disponibles son tarjeta, Yape, Plin y efectivo, solo como opciones simuladas.',
        'Al confirmar una compra con HampCode se crea la entrada y se registra el pago simulado en el mismo paso.',
        'Una entrada puede estar PENDING (reservada, sin pago), PAID (pagada) o CANCELLED (anulada).',
        'No ingreses datos reales de tarjetas ni de cuentas bancarias: la plataforma no procesa pagos reales.',
      ],
    },
    {
      id: 'reembolsos',
      titulo: 'Anulaciones, reembolsos y cambios',
      parrafos: [
        'Estas reglas se describen con fines demostrativos y se detallan en el documento de políticas que consulta el agente. Como los pagos son simulados, no se devuelve dinero real.',
      ],
      lista: [
        'Una entrada PENDING se puede anular en cualquier momento y sin costo; el cupo vuelve a quedar disponible.',
        'Una entrada PAID no se anula desde la plataforma: se solicita un reembolso.',
        'El reembolso se solicita hasta 48 horas antes del evento y se devuelve al mismo medio de pago en 5 a 7 días hábiles.',
        'Si el organizador cancela el evento, el reembolso es del 100 % del valor pagado.',
        'Las entradas de eventos que ya se realizaron no se reembolsan.',
        'La fecha de una entrada no se puede cambiar, y no existe la transferencia de entradas a otra persona.',
      ],
    },
    {
      id: 'ia',
      titulo: 'Uso del agente de inteligencia artificial',
      lista: [
        'HampCode usa un modelo de lenguaje y puede cometer errores. Verifica precios, fechas y compras antes de confirmar.',
        'No compra nada sin tu confirmación y no anula ni reembolsa desde el chat.',
        'Sus respuestas no constituyen asesoría profesional de ningún tipo.',
        'Tus mensajes, y tus grabaciones si usas la voz, se procesan con un proveedor externo de inteligencia artificial para transcribirlos y generar la respuesta. Evita decir o escribir datos personales o sensibles.',
      ],
    },
    {
      id: 'privacidad',
      titulo: 'Datos personales y privacidad',
      lista: [
        'Se guardan solo los datos necesarios para el funcionamiento: tu cuenta, tus entradas, los pagos simulados y tus conversaciones.',
        'Tus conversaciones con HampCode son privadas: solo tú puedes verlas o borrarlas.',
        'Los reportes de ventas de un organizador no incluyen datos personales de los compradores.',
        'Los datos no se venden ni se usan con fines publicitarios.',
        'Al ser un proyecto académico, los datos pueden eliminarse cuando se reinicie o limpie la base de datos.',
      ],
    },
    {
      id: 'conducta',
      titulo: 'Uso aceptable',
      parrafos: ['Al usar EventSales te comprometes a no:'],
      lista: [
        'Suplantar la identidad de otra persona.',
        'Intentar vulnerar la seguridad de la plataforma o acceder a información de otros usuarios.',
        'Publicar contenido ilegal, ofensivo o que infrinja derechos de terceros.',
        'Usar la plataforma para operaciones comerciales reales.',
        'Sobrecargar el servicio con un uso automatizado abusivo.',
      ],
    },
    {
      id: 'contenido',
      titulo: 'Contenido de eventos e imágenes',
      lista: [
        'Los organizadores son responsables de la información que publican. Evita incluir datos reales de terceros.',
        'Las imágenes son referenciales: algunas provienen de bancos de imágenes gratuitos y otras son ilustraciones de ejemplo.',
        'Las marcas y nombres que puedan aparecer pertenecen a sus respectivos dueños.',
      ],
    },
    {
      id: 'propiedad',
      titulo: 'Propiedad intelectual',
      parrafos: [
        'El diseño, el logotipo y el código de EventSales fueron elaborados por Henry Antonio Mendoza Puerta by hampcode. Se ponen a disposición con fines educativos; no se permite copiarlos ni redistribuirlos con fines comerciales sin autorización.',
      ],
    },
    {
      id: 'responsabilidad',
      titulo: 'Limitación de responsabilidad',
      lista: [
        'La plataforma se ofrece «tal cual», sin garantías de disponibilidad, exactitud o continuidad.',
        'El autor no responde por daños derivados del uso de la plataforma, por decisiones tomadas con la información mostrada ni por la pérdida de datos.',
        'EventSales no debe usarse para operaciones reales de venta o compra de entradas.',
      ],
    },
    {
      id: 'cambios',
      titulo: 'Cambios en el servicio y en los términos',
      parrafos: [
        'El servicio y estos términos pueden modificarse en cualquier momento. La fecha de la última actualización figura al inicio de esta página, y seguir usando la plataforma implica aceptar la versión vigente.',
      ],
    },
    {
      id: 'contacto',
      titulo: 'Contacto',
      parrafos: [
        'Por ser un proyecto académico no existe un canal de atención comercial. Las consultas se dirigen al autor del proyecto: Henry Antonio Mendoza Puerta by hampcode.',
      ],
    },
  ];

  ir(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
