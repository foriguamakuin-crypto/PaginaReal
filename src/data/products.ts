import { Product, SizeOption } from '../types';

export const products: Product[] = [
  // ===================== PERROS — ARNÉS / PECHERA =====================

  {
    id: 'd-harness-denim',
    name: 'Arnés Denim',
    category: 'dog',
    type: 'harness',
    description:
      'Diseño ergonómico acolchado, equipado con tensores que permiten ajustar el tamaño del artículo. Fabricado con materiales de alta resistencia, suaves y transpirables. Sus bordes redondeados evitan rozaduras en la piel y el pelaje de la mascota. Incluye traílla.',
    colors: [
      { name: 'Azul', hex: '#3b6bb0', images: ['/images/catalog/1azul.jpeg'] },
      { name: 'Gris', hex: '#8a8a8a', images: ['/images/catalog/aaaaa.jpeg'] },
      { name: 'Negro', hex: '#1c1c1c', images: ['/images/catalog/111.jpeg'] },
    ],
    sizes: [
      { name: 'XS', price: 42500 },
      { name: 'S', price: 43000 },
      { name: 'M', price: 47000 },
      { name: 'L', price: 50000 },
      { name: 'XL', price: 52000 },
    ],
    featured: true,
  },
  {
    id: 'd-harness-flor-princesa',
    name: 'Arnés Flor Línea Princesa',
    category: 'dog',
    type: 'harness',
    description:
      'Diseño ergonómico acolchado, equipado con tensores que permiten ajustar el tamaño del artículo. Fabricado con materiales de alta resistencia, suaves y transpirables. Sus bordes redondeados evitan rozaduras en la piel y el pelaje de la mascota. Incluye traílla.',
    colors: [
      { name: 'Lila', hex: '#b57edc', images: ['/images/catalog/lineaprincesamorado.jpeg'] },
      { name: 'Rojo', hex: '#c0232a', images: ['/images/catalog/lineaprincesarojo.jpeg'] },
      { name: 'Rosado', hex: '#f4a6c0', images: ['/images/catalog/lineaprincesarosa.jpeg'] },
    ],
    sizes: [
      { name: 'XS', price: 42500 },
      { name: 'S', price: 43000 },
      { name: 'M', price: 47000 },
      { name: 'L', price: 50000 },
      { name: 'XL', price: 52000 },
    ],
    featured: true,
  },
  {
    id: 'd-harness-superheroes',
    name: 'Arnés Superhéroes',
    category: 'dog',
    type: 'harness',
    description:
      'Diseño ergonómico acolchado, equipado con tensores que permiten ajustar el tamaño del artículo. Fabricado con materiales de alta resistencia, suaves y transpirables. Sus bordes redondeados evitan rozaduras en la piel y el pelaje de la mascota. Incluye traílla.',
    colors: [
      { name: 'Capitán América', hex: '#b81d24', images: ['/images/catalog/america.jpeg'] },
      { name: 'Superman', hex: '#1c4fb8', images: ['/images/catalog/superman.jpeg'] },
      { name: 'Superchica', hex: '#d6288a', images: ['/images/catalog/supermanrosa.jpeg'] },
      { name: 'Hulk', hex: '#2e7d32', images: ['/images/catalog/hulk.jpeg'] },
      { name: 'Batman', hex: '#1a1a1a', images: ['/images/catalog/batman.jpeg'] },
      { name: 'Deadpool', hex: '#7a1212', images: ['/images/catalog/deadpool.jpeg'] },
      { name: 'Spider-Man', hex: '#e23636', images: ['/images/catalog/spiderman.jpeg'] },
    ],
    sizes: [
      { name: 'XS', price: 42500 },
      { name: 'S', price: 43000 },
      { name: 'M', price: 47000 },
      { name: 'L', price: 50000 },
      { name: 'XL', price: 52000 },
    ],
  },
  {
    id: 'd-harness-corbatin-principe',
    name: 'Arnés Corbatín Línea Príncipe',
    category: 'dog',
    type: 'harness',
    description:
      'Diseño ergonómico acolchado, equipado con tensores que permiten ajustar el tamaño del artículo. Fabricado con materiales de alta resistencia, suaves y transpirables. Sus bordes redondeados evitan rozaduras en la piel y el pelaje de la mascota. Incluye traílla.',
    colors: [
      { name: 'Militar Azul', hex: '#2c3e50', images: ['/images/catalog/arneslineaprincipenegroazul.jpeg'] },
      { name: 'Militar Verde', hex: '#3d4a2a', images: ['/images/catalog/arneslineaprincipemilitar.jpeg'] },
      { name: 'Cafe', hex: '#a09060', images: ['/images/catalog/arneslineaprincipecafe.jpeg'] },
      { name: 'Verde', hex: '#2e8b57', images: ['/images/catalog/arneslineaprincipeverde.jpeg'] },
      { name: 'Azul', hex: '#3b6bb0', images: ['/images/catalog/arneslineaprincipeazultails.jpeg'] },
      { name: 'Rojo', hex: '#c0232a', images: ['/images/catalog/arneslineaprinciperojo.jpeg'] },
      { name: 'Matizado Azul', hex: '#5a82c4', images: ['/images/catalog/arneslineaprincipeazul.jpeg'] },
      { name: 'Matizado Rojo', hex: '#d94a4a', images: ['/images/catalog/arneslineaprinciperojoblancorojo.jpeg'] },
      { name: 'Matizado Fucsia', hex: '#e96bb0', images: ['/images/catalog/arneslineaprinciperosa.jpeg'] },
    ],
    sizes: [
      { name: 'XS', price: 42500 },
      { name: 'S', price: 43000 },
      { name: 'M', price: 47000 },
      { name: 'L', price: 50000 },
      { name: 'XL', price: 52000 },
    ],
  },
  {
    id: 'd-harness-antitirones',
    name: 'Arnés Antitirones',
    category: 'dog',
    type: 'harness',
    description:
      'Arnés antitirones para perros pequeños, medianos y grandes. Elaborado en lona impermeable con malla interior acolchada y transpirable. Cuenta con punto de enganche frontal y dorsal, bandas reflectativas de alta visibilidad, hebillas de liberación rápida con seguro, reguladores para cuello y pecho y una asa rígida engomada en el lomo para brindar mayor control durante el paseo.',
    colors: [
      { name: 'Naranja', hex: '#e8731a', images: ['/images/catalog/tironesnaranja.jpeg'] },
      { name: 'Verde', hex: '#2e8b57', images: ['/images/catalog/tironesverdemilitar.jpeg'] },
      { name: 'Morado', hex: '#6a2c8a', images: ['/images/catalog/tironesmorado.jpeg'] },
      { name: 'Azul Navy', hex: '#3b6bb0', images: ['/images/catalog/pecherasazul.png'] },
      { name: 'Rojo', hex: '#c0232a', images: ['/images/catalog/pecherasroja.png'] },
      { name: 'Fucsia', hex: '#e63b8d', images: ['/images/catalog/pecherasrosa.png'] },
      { name: 'Negro', hex: '#1c1c1c', images: ['/images/catalog/tironesnegro.jpeg'] },
      { name: 'Amarillo', hex: '#ffe600', images: ['/images/catalog/tironesamarillo.jpeg'] },
      { name: 'NaranjaG', hex: '#b64301', images: ['/images/catalog/correcionnaranja.png'] },
    ],
    sizes: [
      { name: 'XS', price: 69000 },
      { name: 'S', price: 72000 },
      { name: 'M', price: 83000 },
      { name: 'L', price: 86000 },
      { name: 'XL', price: 90000 },
    ],
    featured: true,
  },

  // ===================== PERROS — CORREAS =====================

  {
    id: 'd-leash-seguridad-premium',
    name: 'Traílla de Seguridad Premium - Doble Reata (2 metros)',
    category: 'dog',
    type: 'leash',
    description:
      'Traílla de alta resistencia fabricada con doble capa de reata premium. Diseñada para ofrecer máxima seguridad, comodidad y durabilidad. Incorpora mosquetón de alta seguridad, media luna metálica y un agarre firme que evita enredos durante el paseo. Ideal para perros de cualquier tamaño.',
    colors: [
      { name: 'Vinotinto', hex: '#5e2129', images: ['/images/catalog/cuerdavino.jpeg'] },
      { name: 'Rojo', hex: '#c0232a', images: ['/images/catalog/cuerdarojoo.jpeg'] },
      { name: 'Azul Claro', hex: '#7ab8e0', images: ['/images/catalog/cuerdazul.jpeg'] },
      { name: 'Azul Oscuro', hex: '#1f3a5f', images: ['/images/catalog/cuerdaazuloscuro.jpeg'] },
      { name: 'Negro', hex: '#1c1c1c', images: ['/images/catalog/cuerdanegra.jpeg'] },
      { name: 'Fucsia', hex: '#e63b8d', images: ['/images/catalog/cuerdarosa.jpeg'] },
      { name: 'Beige', hex: '#c8b48a', images: ['/images/catalog/cuerdabeich.jpeg'] },
    ],
    sizes: [{ name: 'Única', price: 40000 }],
    oneSize: true,
    sizeLabel: '2 metros',
    featured: true,
  },
  {
    id: 'd-leash-expandible-bungee',
    name: 'Correa Expandible 25 mm + Bungee',
    category: 'dog',
    type: 'leash',
    description:
      'Riata de alta resistencia de 25 mm con tramo elástico tipo bungee que absorbe los tirones durante el paseo. Permite extender la longitud de 1 metro hasta 1.35 metros sin perder el control. Equipada con mosquetón metálico reforzado y costuras dobles para una mayor durabilidad.',
    colors: [
      { name: 'Rojo', hex: '#c0232a', images: ['/images/catalog/exrojo.jpeg'] },
      { name: 'Azul', hex: '#3b6bb0', images: ['/images/catalog/exazul.jpeg'] },
      { name: 'Fucsia', hex: '#e63b8d', images: ['/images/catalog/exrosa.jpeg'] },
      { name: 'Negro', hex: '#1c1c1c', images: ['/images/catalog/exnegro.jpeg'] },
      { name: 'Verde Militar', hex: '#3d4a2a', images: ['/images/catalog/exmilitar.jpeg'] },
      { name: 'Beige', hex: '#c8b48a', images: ['/images/catalog/exbeich.jpeg'] },
      { name: 'Vinotinto', hex: '#5e2129', images: ['/images/catalog/expansiblevinotinto.jpeg'] },
    ],
    sizes: [{ name: 'Única', price: 60000 }],
    oneSize: true,
    sizeLabel: '1 m – 1.35 m',
  },

  // ===================== PERROS — COLLARES =====================

  {
    id: 'd-collar-cuero-hueso-huella',
    name: 'Collar Cuero Grabado Hueso y Huella',
    category: 'dog',
    type: 'collar',
    description:
      'Collar fabricado en cuero 100% de alta calidad con costuras reforzadas, acolchado interno suave y diseño ancho de 38 mm. Incluye grabado decorativo de hueso y huella, cierre tipo americano y argolla metálica de alta resistencia. Diseñado especialmente para perros grandes.',
    colors: [
      { name: 'Vinotinto', hex: '#5e2129', images: ['/images/catalog/collarperrovino.jpeg'] },
      { name: 'Negro', hex: '#1c1c1c', images: ['/images/catalog/collarhuellan.jpeg'] },
      { name: 'Café', hex: '#5c3a21', images: ['/images/catalog/collarhuellac.jpeg'] },
      { name: 'Miel', hex: '#c8975a', images: ['/images/catalog/collarhuellaca.jpeg'] },
      { name: 'Azul', hex: '#3b6bb0', images: ['/images/catalog/collarhuellaa.jpeg'] },
      { name: 'Fucsia', hex: '#e63b8d', images: ['/images/catalog/collarhuellar.jpeg'] },
    ],
    sizes: [
      { name: 'M', price: 90000, measurement: '36 a 45 cm' },
      { name: 'L', price: 110000, measurement: '42 a 54 cm' },
      { name: 'XL', price: 130000, measurement: '54 a 65 cm' },
    ],
    featured: true,
  },
  {
    id: 'd-collar-cuero-tache-plano',
    name: 'Collar Cuero Tache Plano',
    category: 'dog',
    type: 'collar',
    description:
      'Collar fabricado en cuero 100% de alta calidad con costuras reforzadas, acolchado interno suave, diseño ancho de 38 mm, cierre tipo americano y argolla metálica reforzada. Incorpora decoración con taches planos para un estilo elegante y resistente.',
    colors: [
      { name: 'Vinotinto', hex: '#5e2129', images: ['/images/catalog/collarperrovino.jpeg'] },
      { name: 'Negro', hex: '#1c1c1c', images: ['/images/catalog/collartachen.jpeg'] },
      { name: 'Café', hex: '#5c3a21', images: ['/images/catalog/collartachec.jpeg'] },
      { name: 'Miel', hex: '#c8975a', images: ['/images/catalog/collartacheca.jpeg'] },
      { name: 'Aguamarina', hex: '#7fd4d0', images: ['/images/catalog/collartachea.jpeg'] },
      { name: 'Fucsia', hex: '#e63b8d', images: ['/images/catalog/collartacher.jpeg'] },
    ],
    sizes: [
      { name: 'M', price: 90000, measurement: '36 a 45 cm' },
      { name: 'L', price: 100000, measurement: '42 a 54 cm' },
      { name: 'XL', price: 110000, measurement: '54 a 65 cm' },
    ],
  },
  {
    id: 'd-collar-cuero-tache-puntas',
    name: 'Collar Cuero Tache Puntas',
    category: 'dog',
    type: 'collar',
    description:
      'Collar fabricado en cuero 100% de alta calidad con costuras reforzadas, acolchado interno suave, diseño ancho de 38 mm, cierre tipo americano y argolla metálica reforzada. Incorpora taches tipo punta para un estilo robusto y llamativo sin sacrificar la comodidad.',
    colors: [
      { name: 'Vinotinto', hex: '#5e2129', images: ['/images/catalog/collarpuntasv.jpeg'] },
      { name: 'Negro', hex: '#1c1c1c', images: ['/images/catalog/collarpuntasn.jpeg'] },
      { name: 'Café', hex: '#5c3a21', images: ['/images/catalog/collarpuntasc.jpeg'] },
      { name: 'Miel', hex: '#c8975a', images: ['/images/catalog/collarpuntasca.jpeg'] },
      { name: 'Azul', hex: '#3b6bb0', images: ['/images/catalog/collarpuntasa.jpeg'] },
      { name: 'Fucsia', hex: '#e63b8d', images: ['/images/catalog/collarpuntasr.jpeg'] },
    ],
    sizes: [
      { name: 'M', price: 110000, measurement: '36 a 45 cm' },
      { name: 'L', price: 130000, measurement: '42 a 54 cm' },
      { name: 'XL', price: 140000, measurement: '54 a 65 cm' },
    ],
    featured: true,
  },

  // ===================== GATOS — COLLARES =====================

  {
    id: 'c-collar-mono',
    name: 'Collar con Moño para Gato',
    category: 'cat',
    type: 'collar',
    description:
      'Delicado, seguro y con mucho estilo. Elaborado con cinta suave de 1 cm de ancho y un moño liviano. Cuenta con elástico de seguridad anti-ahorque que se libera automáticamente ante un tirón fuerte, ideal para gatos curiosos. Incluye un dije decorativo de gatico. Es el accesorio perfecto para que tu mascota luzca elegante tanto en casa como en sus fotografías.',
    colors: [
      { name: 'Negro', hex: '#1c1c1c', images: ['/images/catalog/mononegro.jpeg'] },
      { name: 'Rojo', hex: '#c0232a', images: ['/images/catalog/monorojo.jpeg'] },
      { name: 'Azul', hex: '#3b6bb0', images: ['/images/catalog/monoazul.jpeg'] },
      { name: 'Fucsia', hex: '#e63b8d', images: ['/images/catalog/monorosado.jpeg'] },
      
      { name: 'Lila', hex: '#b57edc', images: ['/images/catalog/monorosaoscuro.jpeg'] },
    ],
    sizes: [
      { name: 'XS', price: 20000 },
      { name: 'S', price: 20000 },
    ],
    featured: true,
  },
  {
    id: 'c-collar-coqueto',
    name: 'Collar Coqueto para Gato',
    category: 'cat',
    type: 'collar',
    description:
      'Delicado, seguro y con mucho estilo. Fabricado con cinta suave de 1 cm y elástico de seguridad anti-ahorque que se abre automáticamente con un tirón fuerte, ofreciendo mayor protección para gatos curiosos. Incluye un dije decorativo de gatico. Un diseño elegante, cómodo y ligero para el uso diario.',
    colors: [
      { name: 'Rojo', hex: '#c0232a', images: ['/images/catalog/monopuntorojo.png'] },
      { name: 'Azul', hex: '#3b6bb0', images: ['/images/catalog/monopuntosazul.png'] },
      { name: 'Fucsia', hex: '#e63b8d', images: ['/images/catalog/coquetorosado.jpeg'] },
      { name: 'Negro', hex: '#1c1c1c', images: ['/images/catalog/coquetonegro.jpeg'] },
      { name: 'Lila', hex: '#b57edc', images: ['/images/catalog/coquetomorado.jpeg'] },
    ],
    sizes: [{ name: 'Única', price: 20000 }],
    oneSize: true,
    featured: true,
  },
  {
    id: 'c-collar-flor',
    name: 'Collar Flor para Gato',
    category: 'cat',
    type: 'collar',
    description:
      'Delicado, seguro y con mucho estilo. Fabricado con cinta suave de 1 cm e incorpora una flor decorativa liviana. Su sistema de graduación permite ajustar fácilmente el tamaño del collar para mayor comodidad. Incluye un dije decorativo de gatico. Ideal para quienes buscan un accesorio elegante y cómodo para su mascota.',
    colors: [
      { name: 'Rojo', hex: '#c0232a', images: ['/images/catalog/florojo.jpeg'] },
      { name: 'Fucsia', hex: '#e63b8d', images: ['/images/catalog/florosado.jpeg'] },
      { name: 'Lila', hex: '#b57edc', images: ['/images/catalog/flormorado.jpeg'] },
    ],
    sizes: [
      { name: 'XS', price: 20000 },
      { name: 'S', price: 20000 },
    ],
  },
  {
    id: 'c-collar-smoking',
    name: 'Collar Smoking para Gato',
    category: 'cat',
    type: 'collar',
    description:
      'Delicado, seguro y con mucho estilo. Fabricado con cinta suave de 1 cm y un elegante accesorio tipo smoking. Cuenta con sistema de graduación que permite ajustar fácilmente el tamaño del collar para brindar mayor comodidad. Incluye un dije decorativo de gatico. Un diseño sofisticado para ocasiones especiales o para el uso diario.',
    colors: [
      { name: 'Rojo', hex: '#c0232a', images: ['/images/catalog/gatorojo.jpeg'] },
      { name: 'Fucsia', hex: '#e63b8d', images: ['/images/catalog/gatorosado.jpeg'] },
      { name: 'Lila', hex: '#b57edc', images: ['/images/catalog/gatomorado.jpeg'] },
      { name: 'Negro', hex: '#1c1c1c', images: ['/images/catalog/gatonegro.jpeg'] },
    ],
    sizes: [
      { name: 'XS', price: 22000 },
      { name: 'S', price: 22000 },
    ],
    featured: true,
  },
];

export const featuredProducts = products.filter(p => p.featured);

export const typeLabels: Record<string, string> = {
  harness: 'Arnés / Pechera',
  leash: 'Correas',
  collar: 'Collares',
};

export const categoryLabels: Record<string, string> = {
  dog: 'Perros',
  cat: 'Gatos',
};

// Default placeholder used when a product color has no images yet.
export const PLACEHOLDER_IMAGE =
  'https://images.pexels.com/photos/4588435/pexels-photo-4588435.jpeg?auto=compress&cs=tinysrgb&w=800';

export function getProductImage(product: Product, colorName?: string): string {
  if (colorName) {
    const color = product.colors.find(c => c.name === colorName);
    if (color && color.images.length > 0) return color.images[0];
  }
  const firstWithImage = product.colors.find(c => c.images.length > 0);
  if (firstWithImage) return firstWithImage.images[0];
  return PLACEHOLDER_IMAGE;
}

export function getStartingPrice(product: Product): number {
  return Math.min(...product.sizes.map(s => s.price));
}

export function getSizeOption(product: Product, sizeName: string): SizeOption | undefined {
  return product.sizes.find(s => s.name === sizeName);
}
