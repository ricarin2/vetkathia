import { Helmet } from 'react-helmet-async'

type StructuredDataItem = Record<string, unknown>

type StructuredDataProps = {
  data: StructuredDataItem | StructuredDataItem[]
}

function serializeStructuredData(data: StructuredDataItem) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function StructuredData({ data }: StructuredDataProps) {
  const items = Array.isArray(data) ? data : [data]

  return (
    <Helmet>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(item) }}
        />
      ))}
    </Helmet>
  )
}
