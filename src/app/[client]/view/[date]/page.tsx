import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import type { Chronicle } from '@/lib/types';

async function getChronicleData(client: string, date: string): Promise<Chronicle | null> {
  const filePath = path.join(process.cwd(), 'public', 'content', client, `${date}.json`);
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Failed to read or parse ${date}.json for client ${client}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { client: string, date: string } }) {
  const data = await getChronicleData(params.client, params.date);
  if (!data) {
    return {
      title: 'Article Not Found',
    };
  }
  return {
    title: `每日AI智讯 - ${data.date}`,
    description: '每日AI智讯',
  };
}

export default async function ChroniclePage({ params }: { params: { client: string, date: string } }) {
  const data = await getChronicleData(params.client, params.date);

  if (!data) {
    notFound();
  }

  return (
    <>
      <style>{`
        body { background-color: white; }
        b {color:red;font-weight:bold;}
      `}</style>
      <table width="800" cellSpacing="0" cellPadding="0" style={{ margin: '0 auto' }}>
        <tbody>
          <tr>
            <td style={{ padding: '0px', fontFamily: 'Arial, sans-serif' }}>
              <table width="800" cellSpacing="0" cellPadding="0" style={{ margin: '0 0 20px 0' }}>
                <tbody>
                  <tr>
                    <td width="400">
                      <table width="400" cellSpacing="0" cellPadding="0" style={{ margin: '0 auto' }}>
                        <tbody>
                          <tr>
                            <td><img width="150" src="https://tc.z.wiki/autoupload/MCKCBmE6ggFsxC0VziWgtKSfJ_ukFZyEsw5T-T9ae1Kyl5f0KlZfm6UsKj-HyTuv/20250630/bBHs/200X48/bea_logo_1.jpg" alt="logo1" /></td>
                          </tr>
                          <tr>
                            <td>
                              <div style={{ padding: '20px' }}><span
                                style={{ fontSize: '40px', color: '#3B815C', fontFamily: 'arial', fontWeight: 'bold' }}>每日AI智讯</span><br /><span
                                  style={{ fontSize: '20px', color: '#3B815C', fontFamily: 'arial', fontWeight: 'bold' }}>{data.date} {data.day}</span></div>
                            </td>
                          </tr>
                          <tr>
                            <td><img width="200" src="https://tc.z.wiki/autoupload/MCKCBmE6ggFsxC0VziWgtKSfJ_ukFZyEsw5T-T9ae1Kyl5f0KlZfm6UsKj-HyTuv/20250630/HDB2/200X44/bea_logo_left.jpg" alt="logo left" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td width="400"><img width="400" src="https://tc.z.wiki/autoupload/MCKCBmE6ggFsxC0VziWgtKSfJ_ukFZyEsw5T-T9ae1Kyl5f0KlZfm6UsKj-HyTuv/20250630/dOSl/400X214/bea_logo_right.jpg" alt="logo right" /></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          
          <tr>
            <td>
              {data.contents?.map((content, index) => (
                <div key={index}>
                  <div
                    style={{ padding: '10px 20px 10px 20px', backgroundColor: '#E6EDEA', fontSize: '20px', color: '#3B815C', fontFamily: 'arial', fontWeight: 'bold' }}>
                    📄 {content.category_name}</div>
                  {content.articles && content.articles.length > 0 ? (
                    content.articles.map(article => (
                      <div key={article.id} style={{ paddingBottom: '10px', paddingLeft: '20px', paddingTop: '10px', fontSize: '16px', color: '#3B815C', fontFamily: 'arial', fontWeight: 'normal' }}>
                        <span><a id={article.type}></a><a style={{ fontSize: '13pt', fontFamily: '微軟雅黑, serif, serif, EmojiFont', color: 'black', letterSpacing: '0.05pt', background: 'white' }} href={article.link}>{article.id}. <span dangerouslySetInnerHTML={{ __html: article.title }} /></a></span><br />
                        <span style={{ fontSize: '11.5pt', fontFamily: '微軟雅黑, serif, serif, EmojiFont', color: 'rgb(136, 136, 136)', letterSpacing: '0.05pt' }}>媒体：{article.source_name} </span>    <span style={{ fontSize: '11.5pt', fontFamily: '微軟雅黑, serif, serif, EmojiFont', color: 'rgb(136, 136, 136)', letterSpacing: '0.05pt' }}> &nbsp;&nbsp;&nbsp;{article.publish_date}</span><br />
                        <span style={{ fontSize: '11.5pt', fontFamily: '微軟雅黑, serif, serif, EmojiFont', color: 'black', letterSpacing: '0.05pt' }} dangerouslySetInnerHTML={{ __html: article.content + "<br /><br />" }} />
                      </div>
                    ))
                  ) : (
                    <p>No articles found</p>
                  )}
                </div>
              ))}

            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
