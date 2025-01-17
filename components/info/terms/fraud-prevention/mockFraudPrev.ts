interface TextItem {
  title: string;
  text: string;
}
interface LinksMock {
  link: string;
  text: string;
}

interface TextCollection {
  mainTitle: string;
  button: string;
  items: TextItem[];
  links?: LinksMock[] | null;
}

export const mockLinks = [
  {
    text: 'Organizaciones de los Estados Unidos y de Canadá',
    link: '',
  },
  {
    text: 'Federal Trade Commission',
    link: 'https://www.ftc.gov/',
  },

  {
    text: "National Consumers League's Fraud Center",
    link: 'https://fraud.org/',
  },
  {
    text: 'U.S. Postal Inspection Service',
    link: 'https://www.uspis.gov/',
  },
  {
    text: 'Canadian Anti-Fraud Centre',
    link: 'https://antifraudcentre-centreantifraude.ca/',
  },
  {
    text: 'StopFraud.gov',
    link: 'https://www.stopfraud.gov/about.html',
  },
  {
    text: 'Consumer Financial Protection Bureau',
    link: 'https://www.consumerfinance.gov/',
  },
  {
    text: 'Organizaciones del Reino Unido y de Australia',
    link: '',
  },
  {
    text: 'Action Fraud UK',
    link: 'https://www.actionfraud.police.uk/',
  },
  {
    text: 'ScamWatchAustralia',
    link: 'https://www.scamwatch.gov.au/',
  },
];

export const mockTexts: TextCollection[] = [
  {
    mainTitle: 'Prevención del fraude',
    button: 'Prevención del fraude',
    items: [
      {
        title:
          'Recibí un correo electrónico de SwaplyAr donde me solicitaban mi información financiera. ¿Debo suministrarla?',
        text: 'No. SwaplyAr nunca te enviará un correo electrónico no solicitado para pedirte información personal o financiera relacionada contigo. Solo deberías enviar esta información si has iniciado sesión en tu cuenta de SwaplyAr en línea, en SwaplyAr.com La manera más segura de hacerlo es escribir la URL en la barra de direcciones del navegador, en lugar de hacer clic en un vínculo insertado en un correo electrónico no solicitado. Si recibes un correo electrónico sospechoso que parece provenir de SwaplyAr, repórtalo para que podamos investigarlo. Además, si crees que tu información ha sido comprometida, te recomendamos que te comuniques con tu institución financiera de inmediato.',
      },
      {
        title: '¿Qué puedo hacer si el destinatario de los fondos o yo hemos sido víctimas de fraude?',
        text: 'Comunícate con la policía local de inmediato. Reporta tus sospechas de fraude por teléfono o por Internet presentando un reporte en línea, a través del Centro de Fraudes de la Liga de Consumidores Nacionales. Presenta una queja a la Comisión Federal de Comercio o llama gratis al 1-877-FTC-HELP. Si usaste SwaplyAr para enviar dinero como resultado de una estafa, comunícate con SwaplyAr al WhatsApp [+5491123832198] o reporta el fraude mediante nuestro formulario en línea. Comunícate con SwaplyAr de inmediato si recientemente enviaste dinero y ahora te das cuenta de que se trató de una estafa.',
      },
      {
        title: '¿Dónde puedo obtener más información sobre cómo protegerme del fraude al cliente?',
        text: 'Para obtener más información sobre cómo protegerte del fraude, visita nuestra página de Protección para el consumidor.',
      },
      {
        title: '¿Por qué autentican mi identidad?',
        text: 'Lo hacemos para asegurarnos de que tu información personal y financiera esté segura, y para prevenir el fraude.',
      },
      {
        title: '¿Qué es el delito informático?',
        text: 'El delito informático o phishing es un tipo de fraude en línea diseñado para robar información personal, como nombres de usuario, contraseñas, detalles de la tarjeta de crédito o preguntas secretas y respuestas en un sitio web falso de SwaplyAr. En general, el delito informático se lleva a cabo por correo electrónico. La persona recibe un mensaje que se ve como un correo electrónico legítimo enviado por SwaplyAr. Los vínculos incluidos en estos mensajes te dirigen a un sitio web falso que se ve como el sitio en Internet legítimo de SwaplyAr.',
      },
      {
        title: '¿Cómo puedo estar prevenido frente al delito informático?',
        text: 'La mejor manera de evitar convertirte en víctima de estos delitos es estar alerta a las estafas más comunes. Además, recuerda revisar cuidadosamente los mensajes que recibes para ver si es una estafa de delito informático. Hay palabras mal escritas (a menudo, el inglés no es la lengua principal de estos delincuentes informáticos, por eso las faltas de ortografía y los errores de gramática pueden ser indicadores clave) y revisa si los enlaces del correo electrónico realmente te llevan al sitio correcto. Te recomendarmos  guiarte por esa frase que dice que algo parece ser demasiado bueno para ser verdad, probablemente así sea.',
      },
      {
        title: '¿Cómo reconozco el delito informático?',
        text: 'Estos son denominadores comunes del delito informático mediante correos electrónicos: Presencia de vínculos a un sitio web que te solicita que verifiques la información de la cuenta. Presencia de vínculos a un sitio web que te solicita tus números de cuenta bancaria y tarjeta de crédito, nombres de usuario y contraseñas. Mensajes de amenaza que dicen que si no verificas la información de la cuenta, esta será dada de baja.',
      },
      {
        title: '¿Qué debo hacer si creo que puedo haber sido víctima del delito informático?',
        text: 'Si sospechas que has recibido un correo electrónico fraudulento, no lo dudes, denúncialo para que podamos investigarlo.',
      },
    ],
  },
  {
    mainTitle: 'Cómo protegerse del fraude',
    button: 'Cómo protegerse del fraude',
    items: [
      {
        title: '¿Cómo puedes protegerte de los delincuentes que quieren robarte dinero?',
        text: 'Aprende sus engaños. Aplica el sentido común. Y sigue los consejos que te damos aquí. De ti depende si los delincuentes se salen con las suyas o no. Recuerda que cada estafa puede tener éxito o fallar según si participas o no. Consejos para protegerte del fraude con transferencias de dinero.',
      },
      {
        title: 'Siempre:',
        text: 'Conoce con quién estás tratando, en especial si se trata de un premio o un regalo que tú no has solicitado. No confíes en mensajes como: "¡Felicitaciones, ganaste $1,000 en una lotería extranjera!" Investiga la oferta para cerciorarte de que sea real. Si parece demasiado buena para ser verdad, es probable que sea un engaño. Recuerda que transferir dinero es lo mismo que enviar efectivo. Cuando lo envías, no lo tienes más... y no puedes recuperarlo.',
      },
      {
        title: 'Nunca:',
        text: 'Envíes dinero a alguien que no conoces. ¡Nunca! Deposites un cheque de alguien que te dice que le envíes parte del dinero. Envíes dinero a un pariente en problemas sin verificar la historia. Haz preguntas para verificar la identidad de la persona. Envíes dinero para recibir dinero.',
      },
    ],
  },
  {
    mainTitle: 'Informacion sobre las estafas comunes',
    button: 'Estafas comunes dirigidas al cliente',
    items: [
      {
        title: 'Cómo te ayudamos',
        text: 'a continuación te damos un breve resumen de algunas de las estafas más comunes a las que tienes que estar atento. Infórmate leyéndolas y consultando información actualizada en ScamAwareness.org.',
      },
      {
        title: 'Estafa por deuda con el IRS',
        text: '¿Te ha llamado una persona que te dijo que era de una agencia del gobierno y te pidió dinero para cubrir "deudas atrasadas" que le debías al IRS? Es posible que te digan que puedes enviar el dinero o enviar una tarjeta de débito prepaga para cancelar la deuda y que, si así no lo haces, irás a prisión. Aunque estas llamadas tengan un código de área de Washington, D. C., o información engañosa en el identificador de llamadas, ten la seguridad de que cualquier "empleado del gobierno" que se contacte contigo para pedirte envíos de dinero es un delincuente.',
      },
      {
        title: 'Estafas de reembolso',
        text: '¿Te llamó alguien que dijo trabajar para la FTC? ¿La persona que te llamó te prometió ayudarte a conseguir un reembolso de esta agencia? Es una ESTAFA. Nunca envíes dinero ni des el número de tu cuenta de banco ni otra información confidencial a nadie que te prometa reembolsos. Recuerda que la FTC no llama a nadie, jamás pide información bancaria o confidencial, y no pide que se le envíe dinero; si debe reembolsarte conforme a un acuerdo, la FTC lo hará por cheque. Siempre duda, incluso si en el identificador de llamadas sale el nombre de una organización que reconoces o en la que confías. Los delincuentes usan la tecnología para que aparezcan números válidos, y así te fuerzan a responder.',
      },
      {
        title: 'Socorro ante desastres',
        text: 'Cuando ocurren desastres, es importante estar atento a las estafas con organizaciones de beneficencia. Hay muchas maneras legítimas de brindar apoyo a las personas afectadas por inundaciones, terremotos, incendios y otros desastres naturales. Si quieres donar, hazlo como lo has hecho antes o a través de una organización o una empresa de tu confianza, que te expliquen bien cómo se reúnen y usan los fondos. Es importante nunca enviar fondos mediante un servicio de transferencia de dinero como SwaplyAr a alguien que no conoces. Algunas veces, SwaqplyAr respalda programas de donación con una organización de beneficencia renombrada.',
      },
      {
        title: 'Loterías extranjeras',
        text: 'El gobierno de U.S. emitió una advertencia nacional sobre los repetidos casos de fraude a ciudadanos a través de loterías o sorteos extranjeros. Ten en cuenta que, si recibes un aviso de que ganaste una lotería, por más oficial que parezca, y te piden pagar un monto para poder cobrar el premio, es una estafa. A qué prestar atención: Una ley federal prohíbe enviar por correo billetes de lotería, publicidades o pagos para comprar billetes de loterías extranjeras. Sospecha si no recuerdas haber participado en una lotería o un sorteo. Desconfía de loterías o sorteos que te cobran un monto antes de entregarte el premio. Ten cuidado si te piden que envíes dinero adicional como requisito para ser elegible para ganar más premios. Si quieres más detalles, visita la base de datos sobre fraude del Internet Crime Complaint Center del FBI.',
      },
      {
        title: 'Comprar un vehículo',
        text: '¿Encontraste un estupendo vehículo en línea o en una publicidad cuyo precio es demasiado bueno para ser verdad? ¿Te piden que envíes el pago inicial a través de una transferencia de dinero? Por desgracia, es una ESTAFA. No envíes dinero para pagar el vehículo ni al vendedor ni a un representante de pagos. El delincuente puede tratar de convencerte de que le pagues a través de billeteras virtuales e incluso en criptosmonedas para evitar el impuesto a las ventas y así obtener un excelente precio. Hasta pueden enviarte una carta o un correo electrónico de autenticación en el que te dicen que has comprado un artículo, pero que para que te lo envíen, debes enviar fondos. No vas a recibir ni un automóvil ni un camión. Una vez que envías el dinero y lo reciben, no puede ser recuperado; así que, por desgracia, perderás todo el dinero que transfieras.',
      },
      {
        title: 'Enviar dinero a un desconocido',
        text: 'SwaplyAr nunca recomienda enviar dinero a un desconocido. El dinero recibido por un desconocido no puede ser recuperado; así que, por desgracia, no se te reembolsará el dinero. SwaplyAr es muy seguro para enviar dinero a alguien que conoces y en quien confías.',
      },
      {
        title: 'Lotería y sorteos',
        text: 'La lotería o los sorteos legítimos NUNCA les piden a las personas pagar dinero por adelantado. Si recibes una carta, una llamada o un correo electrónico que dicen que ganaste algo (dinero o un premio), pero que antes de que te lo entreguen, debes enviar dinero para pagar impuestos, gastos de aduana u otros cargos, es una estafa. ¿Decía que ganaste, pero no compraste un billete de lotería ni participaste en un sorteo? Es una ESTAFA. No envíes una transferencia de dinero a las personas que dicen que has "GANADO" algo, pero que debes enviarles fondos para que te entreguen el premio.',
      },
      {
        title: 'Compras por Internet',
        text: '¿Has encontrado algo en línea que te interesa, como un perrito, un automóvil, un departamento en alquiler o cualquier artículo a la venta? ¿El precio del artículo parece demasiado bueno para ser verdad y te piden que lo pagues mediante una transferencia de dinero de SwaplyAr? Por desgracia, es una ESTAFA. No envíes dinero para pagar el artículo al vendedor. Hasta es posible que te envíen una carta o un correo electrónico de autenticación en el que dice que has comprado un artículo, pero debes enviar fondos primero. No envíes el dinero. Es una ESTAFA. No recibirás ninguna mercadería. Una vez que envías el dinero y lo reciben, no puede ser recuperado; así que, por desgracia, perderás todo el dinero que transfieras.',
      },
      {
        title: 'Pariente necesitado',
        text: '¿Te llamó un nieto u otro miembro de tu familia? ¿O te llamó un "abogado" o un "oficial de policía" que dijo estar con el miembro de tu familia? ¿Está desesperado porque lo han detenido en Canada por no tener licencia de pesca o por haber pescado especies protegidas? ¿Ha tenido un accidente de tráfico? ¿Te pide dinero para pagar una multa o la reparación del vehículo? ¿Te llamó un pariente para pedirle dinero porque un miembro de su familia necesitaba atención médica o un medicamento? ¡Es una ESTAFA! Sé precavido cuando envíes dinero en cualquiera de estas situaciones. Quienes llaman puede pedirte que envíes dinero a cualquier parte del mundo. Si no puedes verificar con el miembro de tu familia (llamando al número que tenías antes de esta llamada, no al "nuevo número" que quien llama te da) que necesita dinero, y si no estás seguro de la transacción, no envíes el dinero. Perderás todo el dinero que transfieras.',
      },
      {
        title: 'Préstamos',
        text: '¿Recibiste un correo electrónico o una carta que decía que podías obtener un préstamo? ¿Te pidieron que enviaras dinero para cargos, impuestos, honorarios de servicios, adelantos u otros costos del préstamo? Es una ESTAFA. No envíes dinero a una compañía de préstamos para obtener uno. Si transfieres el dinero y lo reciben, no puede ser recuperado. Perderás todo el dinero que hayas enviado.',
      },
      {
        title: 'Cheques y giros postales',
        text: '¿Te llegó un cheque o un giro postal con instrucciones de cobrarlo en tu banco y luego enviar esos fondos a otra persona mediante una transferencia de SwaplyAr? Si te pasó esto, el cheque o el giro postal son falsos, y el banco te hará cubrir la pérdida. Ten en cuenta es muy difícil detectar cheques falsos. Es posible que te prometan un porcentaje del cheque por el trabajo o porque te dicen que les han pagado demás. Es una ESTAFA. No envíes dinero y no cobres ese cheque.',
      },
      {
        title: 'Romance',
        text: '¿Conociste a alguien por un aviso personal, un correo electrónico, una sala de chat o un mensaje instantáneo? ¿Te pidió que le enviaras dinero para viajar o como ayuda económica? No envíes el dinero: es una ESTAFA. El dinero que reciba esta persona no puede ser recuperado, y tú perderás todo lo que envíes.',
      },
      {
        title: 'Avisos del periódico',
        text: '¿Encontraste algo en venta en los clasificados o en otro tipo de aviso del periódico? ¿Pide que pagues el artículo mediante transferencia de dinero de SwaplyAr? Es una ESTAFA. No uses transferencias de dinero para comprar artículos de desconocidos. No es seguro hacerlo.',
      },
      {
        title: 'Estafa con abuso a personas mayores',
        text: 'Un desconocido comienza una relación cercana contigo y te ofrece manejar tus finanzas y tus bienes. O, hay documentos con firmas que no se parecen a la tuya. No te dejes robar el dinero con estafas de abuso financiero. Los delincuentes intentan manipularte para que les entregues propiedades y dinero; así, pueden llegar a quitarte todo en una sola transacción: dinero en efectivo, cuentas bancarias, los ahorros de toda tu vida. Las estafas de abuso financiero pueden darse de varias formas, como fraude con telemercadeo, robo de identidad, préstamos falsos, oferta de mejoras a la vivienda y planificación del patrimonio. Nunca confíes tu dinero a alguien que no conozcas.',
      },
    ],
  },
  {
    mainTitle: 'Como Protegerte del fraude Contra Clientes',
    button: 'Otros Recursos',
    items: [
      {
        title: '',
        text: 'Hay varias organizaciones que brindan información para ayudarte a protegerte del fraude. Selecciona la organización que quieras ver de la lista de abajo para obtener más detalles.',
      },

      {
        title: '',
        text: 'Si crees haber sido víctima de fraude, completa nuestro formulario en línea para denunciarlo, o si sospechas que hubo fraude en una transacción que todavía no ha sido recibida, comunícate con el Centro de Atención al Cliente, al WhatsApp +5491123832198, para que cancelen la transacción de inmediato.',
      },
    ],
    links: mockLinks,
  },
];

export const mockText = [
  {
    title: 'Prevencion del fraude',
    buttton: 'Prevencion del fraude',
    text1:
      'Recibí un correo electrónico de SwaplyAr donde me solicitaban mi información financiera. ¿Debo suministrarla? No. SwaplyAr nunca te enviará un correo electrónico no solicitado para pedirte información personal o financiera relacionada contigo. Solo deberías enviar esta información si has iniciado sesión en tu cuenta de SwaplyAr en línea, en SwaplyAr.com La manera más segura de hacerlo es escribir la URL en la barra de direcciones del navegador, en lugar de hacer clic en un vínculo insertado en un correo electrónico no solicitado.Si recibes un correo electrónico sospechoso que parece provenir de SwaplyAr, repórtalo para que podamos investigarlo. Además, si crees que tu información ha sido comprometida, te recomendamos que te comuniques con tu institución financiera de inmediato.¿Qué puedo hacer si el destinatario de los fondos o yo hemos sido víctimas de fraude? Comunícate con la policía local de inmediato.Reporta tus sospechas de fraude por teléfono o por Internet presentando un reporte en línea, a través del Centro de Fraudes de la Liga de Consumidores Nacionales. Presenta una queja a la Comisión Federal de Comercio o llama gratis al 1-877-FTC-HELP.',
    text2:
      'Si usaste SwaplyAr para enviar dinero como resultado de una estafa, comunícate con SwaplyAr al WhatsApp [+5491123832198] o reporta el fraude mediante nuestro formulario en línea. Comunícate con SwaplyAr de inmediato si recientemente enviaste dinero y ahora te das cuenta de que se trató de una estafa. ¿Dónde puedo obtener más información sobre cómo protegerme del fraude al cliente?Para obtener más información sobre cómo protegerte del fraude, visita nuestra página de Protección para el consumidor.¿Por qué autentican mi identidad?Lo hacemos para asegurarnos de que tu información personal y financiera esté segura, y para prevenir el fraude.¿Qué es el delito informático?El delito informático o phishing es un tipo de fraude en línea diseñado para robar información personal, como nombres de usuario, contraseñas, detalles de la tarjeta de crédito o preguntas secretas y respuestas en un sitio web falso de SwaplyAr. En general, el delito informático se lleva a cabo por correo electrónico. La persona recibe un mensaje que se ve como un correo electrónico legítimo enviado por SwaplyAr. Los vínculos incluidos en estos mensajes te dirigen a un sitio web falso que se ve como el sitio en Internet legítimo de SwaplyAr.',
    text3:
      'Cómo puedo estar prevenido frente al delito informático? La mejor manera de evitar convertirte en víctima de estos delitos es estar alerta a las estafas más comunes. Además, recuerda revisar cuidadosamente los mensajes que recibes para ver si es una estafa de delito informático. Hay palabras mal escritas (a menudo, el inglés no es la lengua principal de estos delincuentes informáticos, por eso las faltas de ortografía y los errores de gramática pueden ser indicadores clave) y revisa si los enlaces del correo electrónico realmente te llevan al sitio correcto.Te recomendarmos  guiarte por esa frase que dice que algo parece ser demasiado bueno para ser verdad, probablemente así sea.¿Cómo reconozco el delito informático?Estos son denominadores comunes del delito informático mediante correos electrónicos:Presencia de vínculos a un sitio web que te solicita que verifiques la información de la cuenta.Presencia de vínculos a un sitio web que te solicita tus números de cuenta bancaria y tarjeta de crédito, nombres de usuario y contraseñasMensajes de amenaza que dicen que si no verificas la información de la cuenta, esta será dada de baja.¿Qué debo hacer si creo que puedo haber sido víctima del delito informáticoSi sospechas que has recibido un correo electrónico fraudulento, no lo dudes, denúncialo para que podamos investigarlo.',
  },

  {
    title: 'Como protegerte del fraude contra Clientes',
    buttton: 'Como protegerse del fraude',
    text1: 'Hay varias organizaciones que brindan información para ayudarte a protegerte del fraude.',
    text2: 'Selecciona la organización que quieras ver de la lista de abajo para obtener más detalles.',
    text3:
      'Si crees haber sido víctima de fraude, completa nuestro formulario en línea para denunciarlo, o si sospechas que hubo fraude en una transacción que todavía no ha sido recibida, comunícate con el Centro de Atención al Cliente, al WhatsApp +5491123832198, para que cancelen la transacción de inmediato.',
  },
  {
    title: 'Estafas comunes dirigidas al cliente',
    buttton: 'Estafas al cliente comunes',
    text1:
      'Las estafas al cliente en el ámbito financiero son cada vez más comunes y sofisticadas, afectando tanto a personas que manejan sus propias finanzas como a aquellas que confían en instituciones para hacerlo.',
    text2:
      'Una de las prácticas más habituales es el phishing, donde los estafadores imitan comunicaciones de bancos o entidades financieras legítimas. Estos mensajes suelen incluir enlaces o solicitudes urgentes que buscan obtener datos confidenciales, como contraseñas, números de tarjetas o códigos de seguridad. La clave para prevenir esta estafa es desconfiar de cualquier solicitud inesperada y verificar siempre la autenticidad de los mensajes antes de responder. Otra forma frecuente de estafa involucra a falsos asesores financieros o brokers que prometen inversiones con altos retornos y bajo riesgo. Atraen a sus víctimas con resultados que parecen demasiado buenos para ser verdad, y en muchos casos, lo son. Investigar la reputación de estas personas o plataformas y evitar transferir dinero sin contratos claros puede reducir significativamente el riesgo.',
    text3:
      'Educar a los clientes sobre estas amenazas y promover la precaución puede ayudar a reducir la incidencia de estas estafas y proteger tanto su bienestar financiero como su tranquilidad.',
  },
  {
    title: 'Otros Recursos',
    buttton: 'Otros recursos',
    text1:
      'La transparencia en los procesos también juega un papel importante. Las instituciones financieras deben garantizar que sus clientes tengan acceso a información clara sobre cómo se manejan sus datos y qué medidas se toman para protegerlos. Además, ofrecer canales de comunicación accesibles y seguros para reportar actividades sospechosas refuerza la confianza del cliente y facilita la acción inmediata en caso de un intento de fraude.',
    text2:
      ' En paralelo, las instituciones deben invertir en tecnología de seguridad avanzada. Esto incluye la implementación de sistemas de autenticación multifactorial (MFA), el cifrado de datos sensibles y el monitoreo constante de transacciones en busca de patrones inusuales. Estas herramientas no solo dificultan el acceso no autorizado a las cuentas de los clientes, sino que también permiten detectar intentos de fraude en tiempo real.',
    text3:
      ' Uno de los pilares fundamentales en la prevención del fraude es la educación financiera. Informar a los usuarios sobre las técnicas más comunes que emplean los estafadores, como el phishing o el robo de identidad, les permite identificar señales de alerta y actuar de manera preventiva. Por ejemplo, enseñar a los clientes a verificar enlaces antes de hacer clic, a evitar compartir información sensible a través de correos electrónicos o mensajes no solicitados, y a consultar directamente con su banco ante cualquier duda puede marcar una gran diferencia.',
  },
];
