/**
 * Photographies du site (Pexels, licence libre : usage commercial autorisé,
 * attribution non obligatoire). Optimisées en WebP à la construction.
 * À remplacer à terme par de vraies photos du cabinet et de ses interventions.
 */
import heroHaussmann from '@/assets/photos/hero-haussmann.jpg';
import cabinetLumiere from '@/assets/photos/cabinet-lumiere.jpg';
import facadeAngle from '@/assets/photos/facade-angle.jpg';
import interieurParis from '@/assets/photos/interieur-paris.jpg';
import facadesRue from '@/assets/photos/facades-rue.jpg';
import toitsMansardes from '@/assets/photos/toits-mansardes.jpg';
import diagDpe from '@/assets/photos/diag-dpe.jpg';
import diagAmiante from '@/assets/photos/diag-amiante.jpg';
import diagPlomb from '@/assets/photos/diag-plomb.jpg';
import diagElectricite from '@/assets/photos/diag-electricite.jpg';
import diagGaz from '@/assets/photos/diag-gaz.jpg';
import diagTermites from '@/assets/photos/diag-termites.jpg';
import diagCarrez from '@/assets/photos/diag-carrez.jpg';
import diagErp from '@/assets/photos/diag-erp.jpg';
import pageDiagnostics from '@/assets/photos/page-diagnostics.jpg';
import pageTarifs from '@/assets/photos/page-tarifs.jpg';
import pageSimulateur from '@/assets/photos/page-simulateur.jpg';
import pageZones from '@/assets/photos/page-zones.jpg';
import pageBlog from '@/assets/photos/page-blog.jpg';
import pageCabinet from '@/assets/photos/page-cabinet.jpg';
import pageDevis from '@/assets/photos/page-devis.jpg';

export const photos = {
  heroHaussmann,
  cabinetLumiere,
  facadeAngle,
  interieurParis,
  facadesRue,
  toitsMansardes,
  pageDiagnostics,
  pageTarifs,
  pageSimulateur,
  pageZones,
  pageBlog,
  pageCabinet,
  pageDevis,
};

/** Photo illustrant chaque diagnostic (clé = identifiant de la page). */
export const diagnosticPhotos: Record<string, ImageMetadata> = {
  dpe: diagDpe,
  amiante: diagAmiante,
  plomb: diagPlomb,
  electricite: diagElectricite,
  gaz: diagGaz,
  termites: diagTermites,
  'loi-carrez-boutin': diagCarrez,
  erp: diagErp,
};

/** Photo d'en-tête des pages zones, réparties pour varier. */
const zoneRotation = [facadeAngle, toitsMansardes, facadesRue, pageZones, heroHaussmann, pageCabinet];
export function zonePhoto(order: number) {
  return zoneRotation[(order - 1) % zoneRotation.length];
}
