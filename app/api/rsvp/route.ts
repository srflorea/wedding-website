import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, guests, attending, dietary, message } = body;

    // Validate required fields - name is always required, email only for 'yes'
    if (!name || (attending === 'yes' && !email)) {
      return NextResponse.json(
        { error: 'Name is required, and email is required when attending' },
        { status: 400 }
      );
    }

    // Airtable configuration
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'RSVP';

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Airtable configuration is missing');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create record in Airtable (URL-encode table name)
    const encodedTableName = encodeURIComponent(AIRTABLE_TABLE_NAME);
    const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodedTableName}`;

    console.log('Attempting to save to Airtable:', {
      baseId: AIRTABLE_BASE_ID,
      tableName: AIRTABLE_TABLE_NAME,
      url: airtableUrl
    });

    const airtableResponse = await fetch(airtableUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          Name: name || '',
          Email: email || '',
          Guests: attending === 'yes' ? Number(guests) : 0,
          Attending: attending,
          'Dietary Requirements': dietary || '',
          Message: message || '',
          'Submitted At': new Date().toISOString().split('T')[0],
        },
      }),
    });

    if (!airtableResponse.ok) {
      const responseText = await airtableResponse.text();
      console.error('Airtable API error:', {
        status: airtableResponse.status,
        statusText: airtableResponse.statusText,
        response: responseText
      });

      let errorMessage = 'Failed to save RSVP';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        // Response wasn't JSON, use the text
        errorMessage = `Airtable error: ${airtableResponse.status} ${airtableResponse.statusText}`;
      }

      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    const data = await airtableResponse.json();
    console.log('RSVP saved successfully:', data.id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your RSVP' },
      { status: 500 }
    );
  }
}
