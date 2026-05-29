import { Body, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text } from '@react-email/components';
import { formatTnd } from '@/lib/currency';

type Props = { order: any; locale: 'fr' | 'en'; siteUrl: string };

export function CustomerOrderConfirmed({ order, locale, siteUrl }: Props) {
  const fr = locale === 'fr';
  return (
    <Html>
      <Head />
      <Preview>{fr ? `Commande AZALI confirmée, ${order.orderNumber}` : `AZALI order confirmed, ${order.orderNumber}`}</Preview>
      <Body style={{ backgroundColor: '#F7F1E6', color: '#271912', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ maxWidth: 620, margin: '0 auto', padding: 32 }}>
          <Section style={{ backgroundColor: '#271912', color: '#F7F1E6', borderRadius: 28, padding: 32, textAlign: 'center' }}>
            <Img src={`${siteUrl}/brand/logo-light.svg`} width="120" alt="AZALI" style={{ margin: '0 auto 18px' }} />
            <Heading style={{ fontFamily: 'Georgia, serif', fontSize: 34, margin: 0 }}>{fr ? 'Votre commande est confirmée' : 'Your order is confirmed'}</Heading>
            <Text style={{ color: '#E9D8C0' }}>{order.orderNumber}</Text>
          </Section>
          <Section style={{ backgroundColor: '#fffaf2', borderRadius: 24, padding: 28, marginTop: 20 }}>
            <Text>{fr ? `Bonjour ${order.customer.firstName},` : `Hello ${order.customer.firstName},`}</Text>
            <Text>{fr ? 'Votre commande AZALI a été vérifiée et confirmée. Le paiement se fera à la livraison.' : 'Your AZALI order has been reviewed and confirmed. Payment will be made on delivery.'}</Text>
            <Hr />
            {order.items.map((item: any) => (
              <Text key={item.id}><strong>{fr ? item.productNameFr : item.productNameEn}</strong> × {item.quantity}<br />{item.colorLabelFr ? `${fr ? 'Couleur' : 'Color'}: ${fr ? item.colorLabelFr : item.colorLabelEn}` : ''}<br />{item.customizations.map((c: any) => `${fr ? c.groupLabelFr : c.groupLabelEn}: ${c.textValue || (fr ? c.optionLabelFr : c.optionLabelEn) || (c.booleanValue ? 'Yes' : '')}`).join(' · ')}<br />{formatTnd(item.lineTotal)}</Text>
            ))}
            <Hr />
            <Text>{fr ? 'Sous-total' : 'Subtotal'}: {formatTnd(order.subtotal)}</Text>
            <Text>{fr ? 'Livraison' : 'Shipping'}: {formatTnd(order.shippingFee)}</Text>
            <Heading as="h2" style={{ fontFamily: 'Georgia, serif' }}>Total: {formatTnd(order.total)}</Heading>
            <Text style={{ color: '#6B6A45' }}>{fr ? 'Livraison en Tunisie uniquement. Merci de garder votre téléphone joignable.' : 'Delivery in Tunisia only. Please keep your phone reachable.'}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
